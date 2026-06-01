# Require admin rights
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "Requesting administrator privileges..." -ForegroundColor Yellow
    Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$Host.UI.RawUI.WindowTitle = "Hardware Info Viewer"

# ========== 辅助函数：获取详细型号 ==========
function Get-DetailedModel {
    param([string]$Manufacturer, [string]$ModelMTM)

    # 1. 首先尝试 Win32_ComputerSystem 的 SystemFamily 字段（联想、戴尔等常用）
    $computer = Get-CimInstance -ClassName Win32_ComputerSystem -ErrorAction SilentlyContinue
    if ($computer.SystemFamily -and $computer.SystemFamily -notmatch "To be filled|OEM|System") {
        return $computer.SystemFamily.Trim()
    }

    # 2. 尝试 Win32_ComputerSystemProduct 的 Name 字段
    $product = Get-CimInstance -ClassName Win32_ComputerSystemProduct -ErrorAction SilentlyContinue
    if ($product.Name -and $product.Name -notmatch "To be filled|OEM|System Product") {
        return $product.Name.Trim()
    }

    # 3. 尝试 Win32_BaseBoard 的 Product 字段
    $board = Get-CimInstance -ClassName Win32_BaseBoard -ErrorAction SilentlyContinue
    if ($board.Product -and $board.Product -notmatch "To be filled|OEM|System") {
        return $board.Product.Trim()
    }

    # 4. 如果都失败，返回原始的 MTM 编码并标注
    return "$ModelMTM (MTM code, no friendly name found)"
}

# ========== 获取计算机型号信息 ==========
$computer = Get-CimInstance -ClassName Win32_ComputerSystem -ErrorAction SilentlyContinue
$manufacturer = if ($computer.Manufacturer) { $computer.Manufacturer.Trim() } else { "Unknown" }
$modelMTM = if ($computer.Model) { $computer.Model.Trim() } else { "Unknown" }
$modelDetailed = Get-DetailedModel -Manufacturer $manufacturer -ModelMTM $modelMTM

Write-Host "========== Computer Model ==========" -ForegroundColor Cyan
Write-Host "Manufacturer          : $manufacturer"
Write-Host "Model (MTM / Code)    : $modelMTM"
Write-Host "Detailed Model        : $modelDetailed"

# ========== 磁盘信息 ==========
Write-Host "`n========== Disk Information ==========" -ForegroundColor Cyan
Get-PhysicalDisk | Select-Object FriendlyName, SerialNumber, MediaType, BusType, @{Name="Size(GB)";Expression={[math]::Round($_.Size/1GB,2)}}

# ========== 内存信息 ==========
Write-Host "`n========== Memory Information ==========" -ForegroundColor Cyan
Get-CimInstance Win32_PhysicalMemory | Select-Object @{Name="FriendlyName";Expression={"$($_.Manufacturer) $($_.PartNumber)"}}, SerialNumber, Speed, @{Name="Size(GB)";Expression={[math]::Round($_.Capacity/1GB,2)}}

# ========== 主板 / 系统序列号 ==========
Write-Host "`n========== Motherboard / System Serial Number ==========" -ForegroundColor Cyan
$bios = Get-CimInstance Win32_BIOS
$board = Get-CimInstance Win32_BaseBoard
Write-Host "BIOS Serial Number (System Serial Number): $($bios.SerialNumber)"
Write-Host "Motherboard Model: $($board.Product)"
Write-Host "Motherboard Manufacturer: $($board.Manufacturer)"
Write-Host "Motherboard Serial Number: $($board.SerialNumber)"

# ========== 等待退出 ==========
Write-Host "`nPress any key to exit..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
