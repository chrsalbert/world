export default function (context) {
    context.store.commit('journey/changeId', context.route.params.id)
}