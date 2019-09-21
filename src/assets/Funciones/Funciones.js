
export function modalConfirmar(confirmacion = 'limpiar los datos', ok_variant = 'danger') {
    return this.$bvModal.msgBoxConfirm(confirmacion, {
        title: '¿Desea Continuar?',
        size: 'md',
        id:'confirmar',
        buttonSize: 'md',
        okVariant: ok_variant,
        okTitle: 'SI',
        cancelTitle: 'NO',
        footerClass: '',
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

