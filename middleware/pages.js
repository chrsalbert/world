export default function (context) {
    context.store.commit('navigation/showSubNav', false)
    context.store.commit('navigation/changeNav', 'default')
}