import emojiList from './emoji.json'
import axios from 'axios';
const emojiAx = axios.create({
    baseURL: 'http://localhost:9000'
})
const Emojis = {
    name: "my-emojis",
    props: {
        uniquekey: {
            type: String,
            default: 'temp'
        }
    },
    data() {
        return {
            activeKey: 'default',
            emojiList: [],
            favoriteList: [],
        }
    },
    computed: {
        origin() {
            return location.hostname;
        }
    },
    methods: {
        getEmojiList() {

        },
        getFavoriteList() {

        },
        upload(ev) {
            let files = ev.target.files;
            if (files.length) {
                let file = files[0];
                let param = new FormData(); // 创建form对象
                param.append("file", file); // 通过append向form对象添加数据
                param.append("origin", this.origin);
                param.append("key", this.uniquekey)
                emojiAx.post('/user/upload', param, {
                    headers: { "Content-Type": "multipart/form-data" }
                })
                // if (/image\/(png|jpe?g)/.test(file.type)) {
                //     if (file.size < 2 * 1024 * 1024) {
                //         console.log('file', file)
                //         let param = new FormData(); // 创建form对象
                //         param.append("file", file); // 通过append向form对象添加数据
                //         // axios.post("http://localhost:3000/user/upload", param,
                //         //     {
                //         //         headers: { "Content-Type": "multipart/form-data" }
                //         //     })
                //         emojiAx.post('/user/upload', param, {
                //             headers: { "Content-Type": "multipart/form-data" }
                //         })
                //     } else {
                //         this.$message.error('表情图片不能大于2MB');
                //     }
                // } else {
                //     this.$message.error('请选择png|jpg格式文件');
                // }
            }
        }
    },
    render(h) {
        return h('a-tabs', {
            props: {
                'v-model': this.activeKey,
                'tab-position': 'bottom',
                tabBarGutter: 0,
                tabBarStyle: {
                    padding: '4px',
                    'margin-top': '2px'
                }
            }
        }, [
            h('a-tab-pane', {
                key: 'default'
            }, [h('my-svg-icon', {
                props: {
                    icon: 'emoji-solid',
                    size: 22,
                    color: 'gold'
                },
                slot: 'tab'
            }),
            h('p', {
                class: ['tab-pane', 'emoji-list', 'scroll-bar']
            }, emojiList.map((emoji) => {
                return h('span', {
                    class: 'emoji-item'
                }, emoji['char'])
            }))
            ]),
            h('a-tab-pane', {
                key: 'favorite'
            }, [h('my-svg-icon', {
                props: {
                    icon: 'favorite',
                    size: 22
                },
                slot: 'tab'
            }),
            h('ul', {
                class: ['tab-pane', 'favorite-list']
            }, [
                h('li', {
                    class: ['favorite-item', 'favorite-add', 'flex-box']
                }, [
                    h('label', {}, [
                        h('my-svg-icon', {
                            props: {
                                icon: 'add',
                                size: 32
                            }
                        }),
                        h('input', {
                            attrs: {
                                type: 'file'
                            },
                            style: {
                                display: 'none'
                            },
                            on: {
                                change: this.upload
                            }
                        })
                    ])
                ]
                )
            ])
            ]),
            h('div', {
                class: 'flex-box',
                style: {
                    height: '45px'
                },
                slot: 'tabBarExtraContent'
            },
                [h('my-svg-icon', {
                    class: "flex-box",
                    props: {
                        icon: 'add-circle',
                        size: 30
                    }
                })])
        ])
    }
}
Emojis.install = function (vue) {
    vue.component(Emojis['name'], Emojis)
}
export default Emojis;