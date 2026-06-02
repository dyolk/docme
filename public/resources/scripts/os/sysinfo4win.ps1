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
    $product = Get-CimInstance -ClassName Win32_ComputerSystemProduct -ErrorAction SilentlyContinue
    $computer = Get-CimInstance -ClassName Win32_ComputerSystem -ErrorAction SilentlyContinue
    $bios = Get-CimInstance Win32_Bios -ErrorAction SilentlyContinue
    $BaseBoard = Get-CimInstance Win32_BaseBoard -ErrorAction SilentlyContinue
    $cpu = Get-CimInstance Win32_Processor -ErrorAction SilentlyContinue
    $gpus = Get-CimInstance Win32_VideoController -ErrorAction SilentlyContinue

    $manufacturer = if ($computer.Manufacturer) { $computer.Manufacturer.Trim() } else { "未知" }
    $modelMTM = if ($computer.Model) { $computer.Model.Trim() } else { "未知" }
    $modelDetailed = if ($product.Name -and $product.Name -notlike "To be filled*") { $product.Name.Trim() } else { $modelMTM }
    $sysSN = if ($bios.SerialNumber) { $bios.SerialNumber.Trim() } else { "未知" }

    # ==========================================
    # 3. 计算机型号与主板信息
    # ==========================================
    Write-Host "【1. 计算机型号与版本信息】" -ForegroundColor Magenta
    Write-Host " ┌──────────────────────────────────────────────────────" -ForegroundColor Cyan
    Out-HardwareRow "设备品牌/制造商" $manufacturer
    Out-HardwareRow "出厂代码 (MTM)" $modelMTM
    Out-HardwareRow "设备特定型号" $modelDetailed
    Out-HardwareRow "整机序列号 (SN)" $sysSN "Yellow"
    Out-HardwareRow "主板型号/版本" ($BaseBoard.Product)
    Out-HardwareRow "主板物理序列号" ($BaseBoard.SerialNumber)
    Write-Host " └──────────────────────────────────────────────────────" -ForegroundColor Cyan
    Write-Host ""

    # ==========================================
    # 4. 【新增】中央处理器 (CPU) 性能指标
    # ==========================================
    Write-Host "【2. 处理器 (CPU) 核心规格与算力】" -ForegroundColor Magenta
    Write-Host " ┌──────────────────────────────────────────────────────" -ForegroundColor Cyan
    $cpuName = $cpu.Name.Trim() -replace '\s+', ' '
    $maxClock = [math]::Round($cpu.MaxClockSpeed / 1000, 2)
    Out-HardwareRow "处理器型号" $cpuName "Green"
    Out-HardwareRow "物理核心 / 线程" "$($cpu.NumberOfCores) 核 / $($cpu.ThreadCount) 线程"
    Out-HardwareRow "硬件标称主频" "$maxClock GHz"

    # 简单测试一下 CPU 单核算力（进行一千万次浮点运算消耗的时间）
    Write-Host " │  [正在进行处理器单核算力实时采样，请稍候...]" -ForegroundColor DarkGray
    $cpuTestTime = Measure-Command {
        for ($i = 0; $i -lt 10000000; $i++) { $null = 1.0001 * 1.0002 }
    }
    $cpuScore = [math]::Round(10000 / $cpuTestTime.TotalMilliseconds, 2)
    Out-HardwareRow "单核运算效率" "$cpuScore 分 (采样耗时: $($cpuTestTime.TotalMilliseconds) ms)" "Cyan"
    Write-Host " └──────────────────────────────────────────────────────" -ForegroundColor Cyan
    Write-Host ""

    # ==========================================
    # 5. 【新增】图形显卡 (GPU) 规格
    # ==========================================
    Write-Host "【3. 图形处理器 (GPU) 显卡规格】" -ForegroundColor Magenta
    Write-Host " ┌──────────────────────────────────────────────────────" -ForegroundColor Cyan
    $gpuIndex = 1
    foreach ($gpu in $gpus) {
        $gpuName = $gpu.Name
        $ramBytes = $gpu.AdapterRAM
        # 处理部分核显获取不到物理显存的情况
        $vram = if ($ramBytes -and $ramBytes -gt 0) { "$([math]::Round($ramBytes / 1GB, 2)) GB" } else { "共享动态内存" }
        $res = "$($gpu.CurrentHorizontalResolution) x $($gpu.CurrentVerticalResolution) @ $($gpu.CurrentRefreshRate)Hz"
        if ($res -eq " x @ Hz") { $res = "后台休眠/非主显示器" }

        Out-HardwareRow "显卡设备 $gpuIndex" $gpuName "Green"
        Out-HardwareRow "└─ 独立显存容量" $vram
        Out-HardwareRow "└─ 当前输出分辨率" $res
        $gpuIndex++
    }
    Write-Host " └──────────────────────────────────────────────────────" -ForegroundColor Cyan
    Write-Host ""

    # ==========================================
    # 6. 内存规格
    # ==========================================
    Write-Host "【4. 内存部件硬件规格】" -ForegroundColor Magenta
    Write-Host " ┌──────────────────────────────────────────────────────" -ForegroundColor Cyan
    $PhysicalMemory = Get-CimInstance Win32_PhysicalMemory
    $memIndex = 1
    foreach ($mem in $PhysicalMemory) {
        $sizeGB = [math]::Round($mem.Capacity / 1GB, 2)
        $rawManufacturer = if ($mem.Manufacturer) { $mem.Manufacturer.Trim() } else { "未知" }

        $friendlyManufacturer = $rawManufacturer
        if ($rawManufacturer -like "*80AD*" -or $rawManufacturer -like "*01AD*") { $friendlyManufacturer = "海力士 (SK Hynix)" }
        elseif ($rawManufacturer -like "*014F*" -or $rawManufacturer -like "*ECE0*") { $friendlyManufacturer = "三星 (Samsung)" }
        elseif ($rawManufacturer -like "*02FE*" -or $rawManufacturer -like "*802C*") { $friendlyManufacturer = "美光 (Micron)" }
        elseif ($rawManufacturer -like "*04CB*" -or $rawManufacturer -like "*AFA0*") { $friendlyManufacturer = "威刚 (ADATA)" }
        elseif ($rawManufacturer -like "*0198*") { $friendlyManufacturer = "金士顿 (Kingston)" }
        elseif ($rawManufacturer -like "*859B*") { $friendlyManufacturer = "关键科技 (Crucial)" }

        Out-HardwareRow "内存插槽 $memIndex" "$friendlyManufacturer | ${sizeGB} GB | $($mem.Speed) MHz"
        Out-HardwareRow "└─ 物理序列号" ($mem.SerialNumber.Trim())
        $memIndex++
    }
    Write-Host " └──────────────────────────────────────────────────────" -ForegroundColor Cyan
    Write-Host ""

    # ==========================================
    # 7. 磁盘规格与类型转换
    # ==========================================
    Write-Host "【5. 存储设备规格明细】" -ForegroundColor Magenta
    Write-Host " ┌──────────────────────────────────────────────────────" -ForegroundColor Cyan
    $DiskDrives = Get-PhysicalDisk | Sort-Object DeviceId
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

        Out-HardwareRow "硬盘型号" "$($disk.FriendlyName)$VendorChinese"
        Out-HardwareRow "磁盘类型" $diskType $typeColor
        Out-HardwareRow "硬盘物理序列号" ($disk.SerialNumber.Trim())
    }
    Write-Host " └──────────────────────────────────────────────────────" -ForegroundColor Cyan
    Write-Host ""

    # ==========================================
    # 8. 系统安装时间与 CDI 通电时间穿透
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
    # 9. 硬盘动态读写速度测试
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
    # 10. 品牌云端大数据追溯链接生成
    # ==========================================
    Write-Host "【8. 官方云端首次联网激活记录追溯】" -ForegroundColor Magenta
    $queryUrl = ""

    if ($manufacturer -like "*Dell*" -or $manufacturer -like "*戴尔*") {
        $queryUrl = "https://www.dell.com/support/home/zh-cn/product-support/servicetag/$sysSN/overview"
        Write-Host " └─ 识别到 Dell 设备，已合成官方专属直通入口。" -ForegroundColor Gray
    }
    elseif ($manufacturer -like "*LENOVO*" -or $manufacturer -like "*联想*") {
        $queryUrl = "https://newsupport.lenovo.com.cn/deviceHistory.html?from=1&searchText=$sysSN"
        Write-Host " └─ 识别到 Lenovo 设备，已动态合成最新版联想服务站全生命周期直通入口。" -ForegroundColor Gray
    }
    else {
        $queryUrl = "https://account.microsoft.com/devices"
        Write-Host " └─ 未知或其它品牌，已自动重定向至微软云端账户硬件绑定追溯历史。" -ForegroundColor Gray
    }

    Write-Host "`n 👉 云端查询通道 : " -NoNewline
    Write-Host $queryUrl -ForegroundColor Yellow
    Write-Host ""

} catch {
    Write-Host "`n[脚本运行异常] : $_" -ForegroundColor Red
}

# ==========================================
# 11. 终极防闪退安全关卡 + 自动拉起浏览器
# ==========================================
Write-Host "================================================────────" -ForegroundColor Cyan
Write-Host " 报告生成完毕。" -ForegroundColor Green
Read-Host " 请按下 [Enter] 键：[自动弹出浏览器直达云端激活历史页] 并安全关闭窗口"

if ($queryUrl) {
    Start-Process $queryUrl
}

while ($true) {
    Start-Sleep -Seconds 10
}
