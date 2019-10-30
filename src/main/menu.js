import {app, BrowserWindow} from "electron";
import robot from 'robotjs'

const electron = require('electron');

let log = msg => electron.dialog.showErrorBox('debug', msg.toString())

let template = [
    {
        label: '文件',
        submenu: [
            {
                label: '打开文件',
                accelerator: 'CmdOrCtrl+O',
                click: (item, focusedWindow) => {
                    focusedWindow.webContents.executeJavaScript(`
                        tinymce.activeEditor.execCommand('open_file');
                    `)

                }
            },
            {
                label: '新建文件',
                accelerator: 'CmdOrCtrl+N',
                click: (item, focusedWindow) => {
                    focusedWindow.webContents.executeJavaScript(`
                        tinymce.activeEditor.execCommand('new_file');
                    `)
                }
            },
            {
                label: '保存',
                accelerator: 'CmdOrCtrl+S',
                click:() =>{
                    robot.keyTap('s', 'control');
                }
            },
            {
                label: '另存为',
                click: (item, focusedWindow) => {
                    focusedWindow.webContents.executeJavaScript(`
                        tinymce.activeEditor.execCommand('save_as');
                    `)
                }
            },
            {
                label: '复制到粘贴板',
                click: (item, focusedWindow) => {
                    focusedWindow.webContents.executeJavaScript(`
                        tinymce.activeEditor.execCommand('wechat');
                    `)
                }
            },
            {
                label: '打印'
            },
            {
                label: '退出',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            },

        ]
    },
    {
        label: '编辑',
        submenu: [
            {
                label: '撤销',
                accelerator: 'CmdOrCtrl+Z',
                role: 'undo'
            },
            {
                label: '重做',
                accelerator: 'Shift+CmdOrCtrl+Z',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: '剪切',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut'
            },
            {
                label: '复制',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy'
            },
            {
                label: '粘贴',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste'
            },
            {
                label: '全选',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectall'
            },
            {
                type: 'separator'
            },

            {
                label: '字体',
                submenu: [
                    {
                        label: '加粗'
                    },
                    {
                        label: '斜体'
                    },
                    {
                        label: '下划线'
                    },
                    {
                        label: '删除线'
                    },
                    {
                        label: '前景色'
                    },
                    {
                        label: '背景色'
                    },
                    {
                        label: '字号',
                        submenu: [
                            {
                                label: 'small'
                            },
                            {
                                label: 'media'
                            },
                            {
                                label: 'large'
                            }
                        ]
                    },

                ]
            },

            {
                type: 'separator'
            },
            {
                label: '对齐',
                submenu: [
                    {
                        label: '左对齐'
                    },
                    {
                        label: '居中对齐'
                    },
                    {
                        label: '右对齐'
                    },
                ]
            },


        ]
    },
    {
        label: '插入',
        submenu: [
            {
                label: '标题',
                submenu: [
                    {
                        label: '一级标题'
                    },
                    {
                        label: '二级标题'
                    },
                    {
                        label: '三级标题'
                    },
                    {
                        label: '四级标题'
                    },
                    {
                        label: '五级标题'
                    },
                ]
            },
            {
                label: 'LaTeX'
            },
            {
                label: '代码'
            },
            {
                label: '流程图'
            },
            {
                label: '图片'
            },
            {
                label: '超链接'
            },
            {
                label: '表格'
            },
            {
                label: '列表',
                submenu: [
                    {
                        label: '有序列表'
                    },
                    {
                        label: '无序列表'
                    },
                    {
                        label: 'todo 列表'
                    },
                ]
            },
            {
                label: '特殊字符'
            }
        ]
    },
    {
        label: '视图',
        submenu: [
            {
                label: '工具栏'
            },
            {
                label: '重载',
                accelerator: 'CmdOrCtrl+R',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        // 重载之后, 刷新并关闭所有的次要窗体
                        if (focusedWindow.id === 1) {
                            BrowserWindow.getAllWindows().forEach(function (win) {
                                if (win.id > 1) {
                                    win.close()
                                }
                            })
                        }
                        focusedWindow.reload()
                    }
                }
            },
            {
                label: '切换全屏',
                accelerator: (function () {
                    if (process.platform === 'darwin') {
                        return 'Ctrl+Command+F'
                    } else {
                        return 'F11'
                    }
                })(),
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
                    }
                }
            },
            {
                label: '切换开发者工具',
                accelerator: (function () {
                    if (process.platform === 'darwin') {
                        return 'Alt+Command+I'
                    } else {
                        return 'Ctrl+Shift+I'
                    }
                })(),
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.toggleDevTools()
                    }
                }
            },
            {
                type: 'separator'
            },
            {
                label: '应用程序菜单演示',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        const options = {
                            type: 'info',
                            title: '应用程序菜单演示',
                            buttons: ['好的'],
                            message: '此演示用于 "菜单" 部分, 展示如何在应用程序菜单中创建可点击的菜单项.'
                        }
                        electron.dialog.showMessageBox(focusedWindow, options, function () {
                        })
                    }
                }
            },
            {
                label: '最小化',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            },

            {
                type: 'separator'
            },
            {
                label: '重新打开窗口',
                accelerator: 'CmdOrCtrl+Shift+T',
                enabled: false,
                key: 'reopenMenuItem',
                click: function () {
                    app.emit('activate')
                }
            }
        ]
    },

    {
        label: '帮助',
        role: 'help',
        submenu: [
            {
                label: '关于'
            },
            {
                label: '学习更多',
                click: function () {
                    electron.shell.openExternal('http://electron.atom.io')
                }
            },
            {
                label: '语法'
            },
            {
                label: '检查更新'
            },
            {
                label: 'bug 反馈'
            }
        ]
    }];
export default template;