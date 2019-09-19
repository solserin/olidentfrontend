
export function showMsgBoxTwo(confirmacion = '¿Quieres limpiar los datos?', ok_variant = 'danger') {
    return this.$bvModal.msgBoxConfirm(confirmacion, {
        title: 'Confirmar',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: ok_variant,
        okTitle: 'SI',
        cancelTitle: 'NO',
        footerClass: 'p-3',
        hideHeaderClose: false,
        centered: false
    })
    .then(value => {
        return value
    })
    .catch(err => {
        return false
    })
}

