const Badge = {
    functional: true,
    name: 'my-badge',
    props: {
        overCount: {
            type: Number,
            default: 99
        },
        count: {
            type: Number,
            default: 0
        },
        zeroShow: {
            type: Boolean,
            default: false
        },
        offset: {
            type: Array,
            default: function () {
                return [0, 0];
            }
        }
    },
    render(h, context) {
        return h('section', {
            class: 'my-badge'
        }, [
            context.children,
            h('div', {
                class: 'unread',
                style: {
                    right: context.props.offset[0] + 'px',
                    top: context.props.offset[1] + 'px'
                }
            }, [
                context.props.count > context.props.overCount ? '99+' : context.props.count
            ])
        ])
    }
};
Badge.install = function (vue) {
    vue.component(Badge['name'], Badge)
}
export default Badge;