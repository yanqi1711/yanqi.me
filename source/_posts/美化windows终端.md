---
title: 美化windows终端
tags:
  - 美化
  - 终端
  - windows
  - PowerShell
categories: 技术
abbrlink: posh
 
date: 2022-03-20 8:57:16
---

## 序言：效果展示

![image-20220402152218264](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20220402152218264.75clcd2odrw0.webp)

终端是程序员日常会使用到的工具。

windows的cmd可以用，但界面也不美观，让人没有欲望使用

所以我就找到了 Windows Terminal 这一软件，可以管理使用多个shell

利用自带的设置就可以轻松美化界面

而且我还会教程PowerShell Core，以及oh-my-posh美化插件，(没错是不是和mac上的zsh有点相似)

---

## 步骤1：下载 & 安装Windows Terminal

![image-20220402154003490](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20220402154003490.2x563oc2eoe0.webp)

> 必须运行 Windows 1903 (build>= 10.0.18362.0) 或更高版本才能运行 Windows 终端

首先需要解决的是你的系统环境问题。如果你有经常升级系统的话，这个问题就不会给你造成影响。
如果你的 Windows 版本不够的话，可以使用 [windows 易升](https://www.microsoft.com/zh-cn/software-download/windows10)进行升级，这里不进行赘述。
打开你的 windows 应用商店（Microsoft Store）搜索 Windows Terminal 进行下载 & 安装。

安装完成后，在”C:\Program Files\WindowsApps\Microsoft.WindowsTerminal_版本号_x64__xxxxxxxx” 目录下，打开”WindowsTerminal.exe” 即可打开软件。

右键创建快捷方式到桌面，或固定到任务栏中。

---

## 步骤 2：下载 & 安装 PowerShell Core

为了获取更佳的 PowerShell 体验，需下载 PowerShell core 版本。
你可以[点击直接下载](https://github.com/PowerShell/PowerShell/releases/download/v7.1.0-preview.6/PowerShell-7.1.0-preview.6-win-x64.msi)。
你也可以[前往 github 查看最新版本](https://github.com/PowerShell/PowerShell/releases)，并下载。
安装完成后，在”C:\Program Files\PowerShell\7-preview” 目录下，打开”pwsh.exe” 即可打开软件。

---

## 步骤 3：配置 PowerShell Core

### ① 安装 powershell 插件

打开刚装好的新版 powershell，逐行输入以下三行命令，等待安装（可能会有点慢）。

后面两个包的来源可能不受系统信任，不用管它，如果让你选择是否信任，直接输入 Y 即可。

```powershell
Install-Module -Name PSReadLine -AllowPrerelease -Force
Install-Module posh-git -Scope CurrentUser
Install-Module oh-my-posh -Scope CurrentUser

# 1. 安装 PSReadline 包，该插件可以让命令行很好用
# 2. 安装 posh-git 包，让你的 git 更好用
# 3. 安装 oh-my-posh 包，让你的命令行更酷炫、优雅
```

### ② 设置 powershell 启动参数

[《Windows Terminal 完美配置 PowerShell 7.1》](https://zhuanlan.zhihu.com/p/137595941)

在powershell窗口输入下面代码：

```
notepad.exe $Profile
```

会打开启动文件

在里面写入以下代码，保存并关闭

```
#------------------------------- Import Modules BEGIN -------------------------------
# 引入 posh-git
Import-Module posh-git

# 引入 oh-my-posh
Import-Module oh-my-posh

# 引入 ps-read-line
Import-Module PSReadLine

# 设置 PowerShell 主题
Set-PoshPrompt -Theme Sorin
#------------------------------- Import Modules END   -------------------------------





#-------------------------------  Set Hot-keys BEGIN  -------------------------------
# 设置预测文本来源为历史记录
Set-PSReadLineOption -PredictionSource History

# 每次回溯输入历史，光标定位于输入内容末尾
Set-PSReadLineOption -HistorySearchCursorMovesToEnd

# 设置 Tab 为菜单补全和 Intellisense
Set-PSReadLineKeyHandler -Key "Tab" -Function MenuComplete

# 设置 Ctrl+d 为退出 PowerShell
Set-PSReadlineKeyHandler -Key "Ctrl+d" -Function ViExit

# 设置 Ctrl+z 为撤销
Set-PSReadLineKeyHandler -Key "Ctrl+z" -Function Undo

# 设置向上键为后向搜索历史记录
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward

# 设置向下键为前向搜索历史纪录
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward
#-------------------------------  Set Hot-keys END    -------------------------------





#-------------------------------    Functions BEGIN   -------------------------------
# Python 直接执行
$env:PATHEXT += ";.py"

# 更新系统组件
function Update-Packages {
	# update pip
	Write-Host "Step 1: 更新 pip" -ForegroundColor Magenta -BackgroundColor Cyan
	$a = pip list --outdated
	$num_package = $a.Length - 2
	for ($i = 0; $i -lt $num_package; $i++) {
		$tmp = ($a[2 + $i].Split(" "))[0]
		pip install -U $tmp
	}

	# update TeX Live
	$CurrentYear = Get-Date -Format yyyy
	Write-Host "Step 2: 更新 TeX Live" $CurrentYear -ForegroundColor Magenta -BackgroundColor Cyan
	tlmgr update --self
	tlmgr update --all

	# update Chocolotey
	Write-Host "Step 3: 更新 Chocolatey" -ForegroundColor Magenta -BackgroundColor Cyan
	choco outdated
}
#-------------------------------    Functions END     -------------------------------





#-------------------------------   Set Alias BEGIN    -------------------------------
# 1. 编译函数 make
function MakeThings {
	nmake.exe $args -nologo
}
Set-Alias -Name make -Value MakeThings

# 2. 更新系统 os-update
Set-Alias -Name os-update -Value Update-Packages

# 3. 查看目录 ls & ll
function ListDirectory {
	(Get-ChildItem).Name
	Write-Host("")
}
Set-Alias -Name ls -Value ListDirectory
Set-Alias -Name ll -Value Get-ChildItem

# 4. 打开当前工作目录
function OpenCurrentFolder {
	param
	(
		# 输入要打开的路径
		# 用法示例：open C:\
		# 默认路径：当前工作文件夹
		$Path = '.'
	)
	Invoke-Item $Path
}
Set-Alias -Name open -Value OpenCurrentFolder
#-------------------------------    Set Alias END     -------------------------------





#-------------------------------   Set Network BEGIN    -------------------------------
# 1. 获取所有 Network Interface
function Get-AllNic {
	Get-NetAdapter | Sort-Object -Property MacAddress
}
Set-Alias -Name getnic -Value Get-AllNic

# 2. 获取 IPv4 关键路由
function Get-IPv4Routes {
	Get-NetRoute -AddressFamily IPv4 | Where-Object -FilterScript {$_.NextHop -ne '0.0.0.0'}
}
Set-Alias -Name getip -Value Get-IPv4Routes

# 3. 获取 IPv6 关键路由
function Get-IPv6Routes {
	Get-NetRoute -AddressFamily IPv6 | Where-Object -FilterScript {$_.NextHop -ne '::'}
}
Set-Alias -Name getip6 -Value Get-IPv6Routes
#-------------------------------    Set Network END     -------------------------------
```

---

## 步骤4：配置Windows Terminal

![image-20220402155024702](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20220402155024702.5uvl9wn6lqg0.webp)

![image-20220402155350665](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20220402155350665.2wq7b1z3o0e0.webp)

在”C:\Program Files\PowerShell\7-preview” 目录下找到pwsh.exe

![image-20220402155521158](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20220402155521158.16b95p7x2s1s.webp)

可以直接配置图标，背景，字体等等

### 推荐字体

推荐使用`FiraCode`，下载链接[戳这里](https://github.com/tonsky/FiraCode/releases)。

解压后选择其中一个`ttf`安装即可，我使用的是这个：

![image-20220402160127147](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20220402160127147.3gsxfogzuns0.webp)

### 更改默认

![image-20220402160307863](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20220402160307863.4f36avi2rxy0.webp)

### 去掉PowerShell Core的更新提示

![image-20220402160408689](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20220402160408689.744czdegl20.webp)

ctrl+f 找到 pwsh.exe 添加–nologo启动参数来去掉这个信息提示

```
–nologo
```

<img src="https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20220402160515252.2sors1n9u3y0.webp" alt="image-20220402160515252" style="zoom:50%;" />

---

## 总结

之前用 mac 的时候鼓捣的是 zsh 感觉非常不错，现在换到 win 也想体验 zsh 那种舒服的感觉所以有了这篇教程，希望对大家有帮助

最后附上一张背景图

![102](https://npm.elemecdn.com/yanqi1711-picx/20220423/102.127nnaabhexs.webp)
