export default function (context) {
    context.store.commit('destination/SET_CURRENT_DESTINATION', context.route.params.id)
}