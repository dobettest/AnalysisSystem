const svgIcon = {
    functional: true,
    name: 'my-svg-icon',
    props: {
        icon: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: 'rgba(0, 0, 0, 0.65);'
        },
        size: {
            type: Number,
            default: 16
        },
        overlayStyle:{
            type:Object
        }
    },
    render(h, context) {
        return h('svg', {
            class: "my-svg-icon",
            style: {
                fontSize: `${context.props.size}px`,
                color: context.props.color,
                ...context.props.overlayStyle
            },
            on: context.listeners
        }, [
            h('use', {
                attrs: {
                    'xlink:href': `#icon-${context.props.icon}`
                }
            })
        ])
    }
};
svgIcon.install = function (vue) {
    vue.component(svgIcon['name'], svgIcon)
}
export default svgIcon;