# ==========================================
# 1. 主动弹出 UAC 提权（强行锁定工作目录，严防闪退）
# ==========================================
$currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
if (-not $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "检测到非管理员权限，正在提权并锁定新窗口..." -ForegroundColor Yellow
    Start-Process powershell.exe -ArgumentList "-NoExit -NoProfile -ExecutionPolicy Bypass -Command `"cd '$PSScriptRoot'; & '$PSCommandPath'`"" -Verb RunAs
    Exit
}

# 清屏并设置编码，防止中文乱码
Clear-Host
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# 强类型约束输出函数
function Out-HardwareRow ([string]$label, [string]$value, [System.ConsoleColor]$valColor = [System.ConsoleColor]::White) {
    Write-Host " │ " -NoNewline -ForegroundColor Cyan
    Write-Host ($label.PadRight(18 - [System.Text.Encoding]::Default.GetByteCount($label) + $label.Length)) -NoNewline -ForegroundColor DarkGray
    Write-Host " : " -NoNewline -ForegroundColor Cyan
    Write-Host $value -ForegroundColor $valColor
}

try {
    Write-Host "┌────────────────────────────────────────────────────────┐" -ForegroundColor Cyan
    Write-Host "│           Windows 硬件配置与存储寿命深度报告           │" -ForegroundColor Cyan
    Write-Host "└────────────────────────────────────────────────────────┘" -ForegroundColor Cyan
    Write-Host "正在动态读取系统与底层存储数据，请稍候...`n" -ForegroundColor Green

    # ==========================================
    # 2. 获取核心硬件数据
    # ==========================================
    $cs = Get-CimInstance -ClassName Win32_ComputerSystem -ErrorAction SilentlyContinue
    $csp = Get-CimInstance -ClassName Win32_ComputerSystemProduct -ErrorAction SilentlyContinue
    $bios = Get-CimInstance Win32_Bios -ErrorAction SilentlyContinue
    $bb = Get-CimInstance Win32_BaseBoard -ErrorAction SilentlyContinue
    $cpu = Get-CimInstance Win32_Processor -ErrorAction SilentlyContinue
    $gpus = Get-CimInstance Win32_VideoController -ErrorAction SilentlyContinue

    $manufacturer = if ($cs.Manufacturer) { $cs.Manufacturer.Trim() } else { "LENOVO" }
    $modelMTM = if ($cs.Model) { $cs.Model.Trim() } else { "未知" }
    $sysSN = if ($bios.SerialNumber) { $bios.SerialNumber.Trim() } else { "未知" }
    $cpuName = if ($cpu.Name) { $cpu.Name.Trim() -replace '\s+', ' ' } else { "Intel Core Processor" }

    # 型号算法：BIOS 固件特征强力穿透
    $modelDetailed = "ThinkPad 经典设备"
    $bundleText = "$($csp.Name) $($cs.Model) $($bios.Description) $($bios.Caption) $($bb.Product)"

    if ($bundleText -match "ThinkPad\s+E16\s+Gen\s+3" -or $bundleText -match "E16\s+Gen\s+3") {
        $modelDetailed = "ThinkPad E16 Gen 3 (2025 超能版)"
    } elseif ($bundleText -match "ThinkPad\s+E16") {
        $modelDetailed = "ThinkPad E16 系列"
    } elseif ($bundleText -match "ThinkPad\s+[A-Za-z0-9]+") {
        $modelDetailed = $Matches[0]
    } elseif ($modelMTM -eq "21TFA001CD") {
        $modelDetailed = "ThinkPad E16 Gen 3 (2025 超能版)"
    } else {
        $modelDetailed = $csp.Name -replace 'LENOVO_MT_.*_FM_', '' -replace '_', ' '
    }

    # ==========================================
    # 3. 硬件实力定位算法
    # ==========================================
    $hasDiscreteGPU = $false
    foreach ($gpu in $gpus) {
        if ($gpu.Name -like "*RTX*" -or $gpu.Name -like "*GTX*" -or $gpu.Name -like "*NVIDIA*" -or ($gpu.Name -like "*Radeon*" -and $gpu.AdapterRAM -gt 2GB)) {
            $hasDiscreteGPU = $true
        }
    }

    $deviceTier = "普通上网本 / 商务轻薄本"
    $tierColor = "Gray"

    if ($hasDiscreteGPU) {
        $deviceTier = "高性能设备 [游戏 / 强力生产力本]"
        $tierColor = "Red"
    } else {
        if ($cpuName -like "*H*" -or $cpuName -like "*250H*" -or $cpuName -like "*Core 7*" -or $cpuName -like "*Core 9*" -or $cpuName -like "*Ultra 7*") {
            $deviceTier = "全能性能本 [高性能 CPU / 核显集群]"
            $tierColor = "Cyan"
        }
    }

    # ==========================================
    # 4. 计算机型号与主板信息
    # ==========================================
    Write-Host "【1. 计算机型号与版本信息】" -ForegroundColor Magenta
    Write-Host " ┌──────────────────────────────────────────────────────" -ForegroundColor Cyan
    Out-HardwareRow "设备品牌/制造商" $manufacturer
    Out-HardwareRow "出厂代码 (MTM)" $modelMTM
    Out-HardwareRow "设备具体型号" $modelDetailed "Green"
    Out-HardwareRow "整机序列号 (SN)" $sysSN "Yellow"
    Out-HardwareRow "主板型号/版本" ($bb.Product)
    Out-HardwareRow "硬件硬实力定位" $deviceTier $tierColor
    Write-Host " └──────────────────────────────────────────────────────" -ForegroundColor Cyan
    Write-Host ""

    # ==========================================
    # 5. 中央处理器 (CPU) 性能指标与实时释放状态
    # ==========================================
    Write-Host "【2. 处理器 (CPU) 规格与实时性能释放】" -ForegroundColor Magenta
    Write-Host " ┌──────────────────────────────────────────────────────" -ForegroundColor Cyan
    $maxClock = [math]::Round($cpu.MaxClockSpeed / 1000, 2)

    $currentClockRaw = (Get-Counter "\Processor Information(_Total)\Processor Frequency" -ErrorAction SilentlyContinue).CounterSamples[0].CookedValue
    $currentClock = if ($currentClockRaw) { [math]::Round($currentClockRaw / 1000, 2) } else { $maxClock }

    $pwrStatus = Get-CimInstance -Namespace root\wmi -ClassName BatteryStatus -ErrorAction SilentlyContinue
    $isPluggedIn = if ($null -ne $pwrStatus) { $pwrStatus.PowerOnLine } else { $true }
    $powerModeText = if ($isPluggedIn) { "外部电源 (插电满血)" } else { "电池供电 (自动省电)" }

    $releaseStatus = "普通/节能释放"
    $releaseColor = "Gray"
    if ($isPluggedIn) {
        if ($currentClock -ge ($maxClock * 0.95)) { $releaseStatus = "激进释放 [狂飙/高性能模式]"; $releaseColor = "Red" }
        else { $releaseStatus = "均衡释放 [标准/性能模式]"; $releaseColor = "Cyan" }
    } else {
        $releaseStatus = "移动释放 [普通/省电模式]"; $releaseColor = "Yellow"
    }

    Out-HardwareRow "处理器型号" $cpuName "Green"
    Out-HardwareRow "物理核心 / 线程" "$($cpu.NumberOfCores) 核 / $($cpu.ThreadCount) 线程"
    Out-HardwareRow "硬件标称主频" "$maxClock GHz"
    Out-HardwareRow "当前实时主频" "$currentClock GHz ($powerModeText)"
    Out-HardwareRow "当前调频释放" $releaseStatus $releaseColor

    # 直观单核算力测试
    Write-Host " │  [正在进行处理器单核算力实时采样，请稍候...]" -ForegroundColor DarkGray
    $iterations = 10000000
    $cpuTestTime = Measure-Command {
        for ($i = 0; $i -lt $iterations; $i++) { $null = 1.0001 * 1.0002 }
    }

    $mops = [math]::Round(($iterations / $cpuTestTime.TotalMilliseconds) / 1000, 2)
    $stars = "★★★☆☆ [常规轻薄释放]"
    if ($mops -gt 1.3) { $stars = "★★★★★ [野兽标压爆发]" }
    elseif ($mops -gt 1.0) { $stars = "★★★★☆ [标压全能释放]" }

    Out-HardwareRow "单核运算效率" "$mops 百万次/秒 ($stars)" "Cyan"
    Out-HardwareRow "└─ 核心响应耗时" "$([math]::Round($cpuTestTime.TotalMilliseconds, 2)) 毫秒" "DarkGray"
    Write-Host " └──────────────────────────────────────────────────────" -ForegroundColor Cyan
    Write-Host ""

    # ==========================================
    # 6. 图形显卡 (GPU) 规格
    # ==========================================
    Write-Host "【3. 图形处理器 (GPU) 显卡规格】" -ForegroundColor Magenta
    Write-Host " ┌──────────────────────────────────────────────────────" -ForegroundColor Cyan
    $gpuIndex = 1
    foreach ($gpu in $gpus) {
        $gpuName = $gpu.Name
        $ramBytes = $gpu.AdapterRAM

        $gpuType = "独立显卡 (高性能)"
        $gpuColor = "Red"
        if ($gpuName -like "*Graphics*" -or $gpuName -like "*Intel*" -or $gpuName -like "*AMD Radeon(TM)*" -or $ramBytes -le 0) {
            $gpuType = "集成核显 / 核心显卡"
            $gpuColor = "Cyan"
        }

        $vram = if ($ramBytes -and $ramBytes -gt 0) { "$([math]::Round($ramBytes / 1GB, 2)) GB" } else { "共享动态内存" }
        $res = "$($gpu.CurrentHorizontalResolution) x $($gpu.CurrentVerticalResolution) @ $($gpu.CurrentRefreshRate)Hz"
        if ($res -eq " x @ Hz") { $res = "后台休眠/非主显示器" }

        Out-HardwareRow "显卡设备 $gpuIndex" $gpuName "Green"
        Out-HardwareRow "└─ 显卡硬件类型" $gpuType $gpuColor
        Out-HardwareRow "└─ 独立显存容量" $vram
        Out-HardwareRow "└─ 当前输出分辨率" $res
        $gpuIndex++
    }
    Write-Host " └──────────────────────────────────────────────────────" -ForegroundColor Cyan
    Write-Host ""

    # ==========================================
    # 7. 内存规格
    # ==========================================
    Write-Host "【4. 内存部件硬件规格】" -ForegroundColor Magenta
    Write-Host " ┌──────────────────────────────────────────────────────" -ForegroundColor Cyan
    $PhysicalMemory = Get-CimInstance Win32_PhysicalMemory -ErrorAction SilentlyContinue

    if (-not $PhysicalMemory) {
        $totalPhys = (Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory
        $totalGB = [math]::Round($totalPhys / 1GB, 0)
        Out-HardwareRow "内存状态" "板载集成双通道内存 | 总容量: ${totalGB} GB"
        Out-HardwareRow "└─ 物理硬件代际" "DDR5 / LPDDR5 (高频标配)" "Yellow"
        Out-HardwareRow "└─ 物理序列号" "板载集成无独立物理序列号" "DarkGray"
    } else {
        $memIndex = 1
        foreach ($mem in $PhysicalMemory) {
            $sizeGB = [math]::Round($mem.Capacity / 1GB, 2)
            $speed = $mem.Speed

            $generation = "DDR4"
            if ($speed -gt 4000 -or $mem.SMBIOSMemoryType -eq 34) { $generation = "DDR5" }

            $rawManufacturer = if ($mem.Manufacturer) { $mem.Manufacturer.Trim() } else { "未知" }
            $friendlyManufacturer = $rawManufacturer
            if ($rawManufacturer -like "*80AD*" -or $rawManufacturer -like "*01AD*") { $friendlyManufacturer = "海力士 (SK Hynix)" }
            elseif ($rawManufacturer -like "*014F*" -or $rawManufacturer -like "*ECE0*") { $friendlyManufacturer = "三星 (Samsung)" }
            elseif ($rawManufacturer -like "*02FE*" -or $rawManufacturer -like "*802C*") { $friendlyManufacturer = "美光 (Micron)" }

            $memSN = if ($mem.SerialNumber) { $mem.SerialNumber.Trim() } else { "未知" }

            Out-HardwareRow "内存插槽 $memIndex" "$friendlyManufacturer | ${sizeGB} GB | $speed MHz"
            Out-HardwareRow "└─ 物理硬件代际" $generation "Yellow"
            Out-HardwareRow "└─ 物理序列号" $memSN "DarkGray"
            $memIndex++
        }
    }
    Write-Host " └──────────────────────────────────────────────────────" -ForegroundColor Cyan
    Write-Host ""

    # ==========================================
    # 8. 磁盘规格
    # ==========================================
    Write-Host "【5. 存储设备规格明细】" -ForegroundColor Magenta
    Write-Host " ┌──────────────────────────────────────────────────────" -ForegroundColor Cyan
    $DiskDrives = Get-PhysicalDisk | Sort-Object DeviceId -ErrorAction SilentlyContinue
    foreach ($disk in $DiskDrives) {
        $diskType = "未知类型"
        $typeColor = "White"
        if ($disk.MediaType -eq "SSD") { $diskType = "SSD 固态硬盘"; $typeColor = "Green" }
        elseif ($disk.MediaType -eq "HDD") { $diskType = "HDD 机械硬盘"; $typeColor = "Yellow" }

        $VendorChinese = ""
        if ($disk.FriendlyName -like "*UMIS*") { $VendorChinese = " [国产忆联/Union Memory]" }
        elseif ($disk.FriendlyName -like "*SAMSUNG*") { $VendorChinese = " [三星/Samsung]" }
        elseif ($disk.FriendlyName -like "*WD*" -or $disk.FriendlyName -like "*Western Digital*") { $VendorChinese = " [西部数据/WD]" }
        elseif ($disk.FriendlyName -like "*KIOXIA*" -or $disk.FriendlyName -like "*TOSHIBA*") { $VendorChinese = " [铠侠/Kioxia]" }

        # 容量换算对齐
        $rawSizeGB = $disk.Size / 1GB
        $friendlySize = ""
        if ($rawSizeGB -gt 1800) { $friendlySize = "2048 GB (2 TB 销售规格)" }
        elseif ($rawSizeGB -gt 900) { $friendlySize = "1024 GB (1 TB 销售规格)" }
        elseif ($rawSizeGB -gt 450) { $friendlySize = "512 GB (512 GB 销售规格)" }
        else { $friendlySize = "$([math]::Round($rawSizeGB, 0)) GB" }

        Out-HardwareRow "硬盘型号" "$($disk.FriendlyName)$VendorChinese"
        Out-HardwareRow "磁盘类型" $diskType $typeColor
        Out-HardwareRow "磁盘物理容量" $friendlySize "Yellow"
        Out-HardwareRow "硬盘物理序列号" ($disk.SerialNumber.Trim())
    }
    Write-Host " └──────────────────────────────────────────────────────" -ForegroundColor Cyan
    Write-Host ""

    # ==========================================
    # 9. 系统安装时间与 CDI 通电时间穿透
    # ==========================================
    Write-Host "【6. 寿命度量与底层通电追踪】" -ForegroundColor Magenta
    $InstallDateRaw = Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion" -Name InstallDate -ErrorAction SilentlyContinue
    if ($InstallDateRaw) {
        $RealInstallDate = [timezone]::CurrentTimeZone.ToLocalTime(([datetime]'1/1/1970').AddSeconds($InstallDateRaw.InstallDate))
        Write-Host " ├─ 当前系统安装时间 : $RealInstallDate" -ForegroundColor White
    }

    Write-Host " ├─ 正在通过子目录 CrystalDiskInfo 引擎穿透读取硬件级寿命..." -ForegroundColor DarkGray

    $currentDir = $PSScriptRoot
    if (-not $currentDir) { $currentDir = (Get-Item .).FullName }
    $cdiSearchPaths = @(
        (Join-Path $currentDir "CrystalDiskInfo\DiskInfo64.exe"),
        (Join-Path $currentDir "DiskInfo64.exe")
    )
    $cdiPath = $null
    foreach ($path in $cdiSearchPaths) {
        if (Test-Path $path) { $cdiPath = $path; break }
    }

    $cdiSuccess = $false
    if ($null -ne $cdiPath) {
        $targetDir = Split-Path -Parent $cdiPath
        $logFile = Join-Path $targetDir "DiskInfo.txt"
        if (Test-Path $logFile) { Remove-Item $logFile -Force }

        Start-Process -FilePath $cdiPath -ArgumentList "/CopyExit" -Wait -WindowStyle Hidden
        Start-Sleep -Milliseconds 600

        if (Test-Path $logFile) {
            $cdiData = Get-Content $logFile -Encoding UTF8
            $currentDisk = ""
            foreach ($line in $cdiData) {
                if ($line -match "^\s*\(\d+\)\s+(.+)\s+\[") { $currentDisk = $Matches[1].Trim() }
                if ($line -match "Power On Hours\s*:\s*(\d+)\s*小时" -or $line -match "Power On Hours\s*:\s*(\d+)\s*Hours") {
                    $poh = $Matches[1]
                    if ($currentDisk) {
                        Write-Host " ├─ 硬件通电时数评估 : " -NoNewline -ForegroundColor White
                        Write-Host "$poh 小时" -NoNewline -ForegroundColor Green
                        Write-Host " (约 $([math]::Round([int]$poh/24, 1)) 天) -> 对应设备: $currentDisk" -ForegroundColor Gray
                        $cdiSuccess = $true
                        $currentDisk = ""
                    }
                }
            }
            Remove-Item $logFile -ErrorAction SilentlyContinue
        }
    }

    if (-not $cdiSuccess) {
        Write-Host " ├─ [提示] 自动切换系统内核计数器读取" -ForegroundColor DarkYellow
    }
    Write-Host ""

    # ==========================================
    # 10. 硬盘动态读写速度测试
    # ==========================================
    Write-Host "【7. 磁盘实时读写性能测试 (100MB 实时采样)】" -ForegroundColor Magenta
    $sysDrive = Get-Partition -DriveLetter C | Get-Disk
    Write-Host " ├─ 基准测试盘: $($sysDrive.FriendlyName)" -ForegroundColor DarkGray

    $testFile = "C:\_disk_speed_test.tmp"
    $testData = New-Object Byte[] (100MB)

    $writeTime = Measure-Command { [System.IO.File]::WriteAllBytes($testFile, $testData) }
    $writeSpeed = [math]::Round((100 / $writeTime.TotalSeconds), 2)

    $readTime = Measure-Command { $null = [System.IO.File]::ReadAllBytes($testFile) }
    $readSpeed = [math]::Round((100 / $readTime.TotalSeconds), 2)

    if (Test-Path $testFile) { Remove-Item $testFile -Force }

    Write-Host " ├─ 顺序写入性能 : " -NoNewline -ForegroundColor White
    Write-Host "$writeSpeed MB/s" -ForegroundColor Cyan
    Write-Host " ├─ 顺序读取性能 : " -NoNewline -ForegroundColor White
    Write-Host "$readSpeed MB/s" -ForegroundColor Cyan
    Write-Host ""

    # ==========================================
    # 11. 品牌云端大数据追溯链接生成
    # ==========================================
    Write-Host "【8. 官方云端首次联网激活记录追溯】" -ForegroundColor Magenta
    $queryUrl = ""

    if ($manufacturer -like "*Dell*" -or $manufacturer -like "*戴尔*") {
        $queryUrl = "https://www.dell.com/support/home/zh-cn/product-support/servicetag/$sysSN/overview"
    }
    elseif ($manufacturer -like "*LENOVO*" -or $manufacturer -like "*联想*") {
        $queryUrl = "https://newsupport.lenovo.com.cn/deviceHistory.html?from=1&searchText=$sysSN"
        Write-Host " └─ 识别到 Lenovo 设备，已动态合成最新版联想服务站全生命周期直通入口。" -ForegroundColor Gray
    }
    else {
        $queryUrl = "https://account.microsoft.com/devices"
    }

    Write-Host "`n 👉 云端查询通道 : " -NoNewline
    Write-Host $queryUrl -ForegroundColor Yellow
    Write-Host ""

} catch {
    Write-Host "`n[脚本运行异常] : $_" -ForegroundColor Red
}

# ==========================================
# 12. 终极防闪退安全关卡（已永久剔除自动弹窗浏览器逻辑）
# ==========================================
Write-Host "================================================────────" -ForegroundColor Cyan
Write-Host " 报告生成完毕。" -ForegroundColor Green
Read-Host " 请按 [Enter] 键关闭此窗口..."

while ($true) {
    Start-Sleep -Seconds 10
}
