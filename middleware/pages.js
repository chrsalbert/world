export default function (context) {
    context.store.commit('navigation/toggleSubNav', false)
    context.store.commit('navigation/changeContext', 'default')
}