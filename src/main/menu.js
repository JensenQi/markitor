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
                click: () => {
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
                label: '打印',
                accelerator: 'CmdOrCtrl+P',
                click: (item, focusedWindow) => {
                    focusedWindow.webContents.executeJavaScript(`
                        tinymce.activeEditor.execCommand('mcePrint');
                    `)
                }

            },
            {
                label: '退出',
                accelerator: 'CmdOrCtrl+Q',
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
                accelerator: 'CmdOrCtrl+Y',
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
                        label: '加粗',
                        click: (item, focusedWindow) => {
                            focusedWindow.webContents.executeJavaScript(`
                                tinymce.activeEditor.execCommand('bold');
                            `)
                        }
                    },
                    {
                        label: '斜体',
                        click: (item, focusedWindow) => {
                            focusedWindow.webContents.executeJavaScript(`
                                tinymce.activeEditor.execCommand('italic');
                            `)
                        }
                    },
                    {
                        label: '下划线',
                        click: (item, focusedWindow) => {
                            focusedWindow.webContents.executeJavaScript(`
                                tinymce.activeEditor.execCommand('underline');
                            `)
                        }
                    },
                    {
                        label: '删除线',
                        click: (item, focusedWindow) => {
                            focusedWindow.webContents.executeJavaScript(`
                                tinymce.activeEditor.execCommand('strikethrough');
                            `)
                        }
                    },
                    {
                        label: '前景色',
                        enabled: false
                    },
                    {
                        label: '背景色',
                        enabled: false
                    },
                    {
                        label: '字号',
                        submenu: [
                            {
                                label: '大',
                                click: (item, focusedWindow) => {
                                    focusedWindow.webContents.executeJavaScript(`
                                        tinymce.activeEditor.execCommand('fontsize', false, 7);
                                    `)
                                }
                            },
                            {
                                label: '中',
                                click: (item, focusedWindow) => {
                                    focusedWindow.webContents.executeJavaScript(`
                                        tinymce.activeEditor.execCommand('fontsize', false, 5);
                                    `)
                                }
                            },
                            {
                                label: '小',
                                click: (item, focusedWindow) => {
                                    focusedWindow.webContents.executeJavaScript(`
                                        tinymce.activeEditor.execCommand('fontsize', false, 3);
                                    `)
                                }
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
                        label: '左对齐',
                        click: (item, focusedWindow) => {
                            focusedWindow.webContents.executeJavaScript(`
                                tinymce.activeEditor.execCommand('JustifyLeft');
                            `)
                        }

                    },
                    {
                        label: '居中对齐',
                        click: (item, focusedWindow) => {
                            focusedWindow.webContents.executeJavaScript(`
                                tinymce.activeEditor.execCommand('JustifyCenter');
                            `)
                        }
                    },
                    {
                        label: '右对齐',
                        click: (item, focusedWindow) => {
                            focusedWindow.webContents.executeJavaScript(`
                                tinymce.activeEditor.execCommand('JustifyRight');
                            `)
                        }
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
                label: '引用',
                click: (item, focusedWindow) => {

                }

            },
            {
                label: 'LaTeX',
                click: (item, focusedWindow) => {
                    focusedWindow.webContents.executeJavaScript(`
                        tinymce.activeEditor.execCommand('latex');
                    `)
                }
            },
            {
                label: '代码',
                click: (item, focusedWindow) => {
                    focusedWindow.webContents.executeJavaScript(`
                        tinymce.activeEditor.execCommand('highlight');
                    `)
                }
            },
            {
                label: '流程图',
                enabled: false
            },
            {
                label: '图片',
                enabled: false
            },
            {
                label: '超链接',
                click: (item, focusedWindow) => {
                    focusedWindow.webContents.executeJavaScript(`
                        tinymce.activeEditor.execCommand('mcelink');
                    `)
                }

            },
            {
                label: '表格',
                enabled: false
            },
            {
                label: '列表',
                submenu: [
                    {
                        label: '有序列表',
                        click: (item, focusedWindow) => {
                            focusedWindow.webContents.executeJavaScript(`
                                tinymce.activeEditor.execCommand('InsertOrderedList');
                            `)
                        }

                    },
                    {
                        label: '无序列表',
                        click: (item, focusedWindow) => {
                            focusedWindow.webContents.executeJavaScript(`
                                tinymce.activeEditor.execCommand('InsertUnorderedList');
                            `)
                        }
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
                label: '源代码',
                click: (item, focusedWindow) => {
                    focusedWindow.webContents.executeJavaScript(`
                        tinymce.activeEditor.execCommand('mceCodeEditor');
                    `)

                }
            },
            {
                label: '预览',
                click: (item, focusedWindow) => {
                    focusedWindow.webContents.executeJavaScript(`
                        tinymce.activeEditor.execCommand('mcePreview');
                    `)
                }
            },
            {
                label: '重载',
                accelerator: 'CmdOrCtrl+R',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
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
                accelerator: 'F11',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
                    }
                }
            },
            {
                label: '切换开发者工具',
                accelerator: 'F12',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.toggleDevTools()
                    }
                }
            },
        ]
    },

    {
        label: '帮助',
        role: 'help',
        submenu: [
            {
                label: '关于',
                click: (item, focusedWindow) => {
                    const options = {
                        type: 'info',
                        title: 'markitor',
                        buttons: ['好的'],
                        message: 'Version: 0.0.1\nAuthor: Jensen\nLicense: Apache2.0'
                    };
                    electron.dialog.showMessageBox(focusedWindow, options, () => {
                    })
                }

            },
            {
                label: '使用指南',
                click: () => {
                    electron.shell.openExternal('https://github.com/JensenQi/markitor')
                }
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