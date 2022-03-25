const messageBox = {
    functional: true,
    name: 'm-messagebox',
    props: {
        icons: []
    },
    render(h) {
        return h('section', {

        }, [
            h('ul', {},
                context.props.icons.map(icon => {
                    return h('svg-icon', {
                        props: icon
                    })
                })
            )
        ])
    }
}
messageBox.install = function (vue) {
    vue.component(messageBox['name'], messageBox)
}
export default messageBox;