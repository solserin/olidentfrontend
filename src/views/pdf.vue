<template>
<div>
    <div>
        <b-modal id="modalPdf" @hidden="resetear_pdf" @close="resetear_pdf" hide-footer>
            <template v-slot:modal-title>
                {{nombrepdf}}
            </template>
            <div class="d-block text-center">
                <div>
                    <b-embed type="iframe" aspect="16by9" :src="pdf_url" allowfullscreen></b-embed>
                </div>
            </div>
        </b-modal>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props: {
        url_pdf: {
            type: String
        },
        pdfNombre: {
            type: String
        }
    },
    watch: {
        url_pdf: function () {
            this.pdf_url = this.url_pdf
            if (this.pdf_url != "") {
                this.descarga();
            }
        },
        pdfNombre: function () {
            this.nombrepdf = this.pdfNombre
        }
    },
    data() {
        return {
            pdf_url: '',
            nombrepdf: ''
        }
    },
    methods: {
        descarga() {
            this.$store.dispatch('loading');
            axios({
                url: this.pdf_url,
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                var fileURL = window.URL.createObjectURL(new Blob([response.data], {
                    type: 'application/pdf'
                }));
                var fileLink = document.createElement('a');
                this.pdf_url = fileURL;
                fileLink.href = fileURL;
                this.pdf_url = fileLink.href;
                fileLink.setAttribute('download', 'file.pdf');
                document.body.appendChild(fileLink);
                this.$store.dispatch('success');
                this.$bvModal.show('modalPdf')
                //fileLink.click();
            }).catch(error => {
                this.resetear_pdf()
                this.$toasted.show("Ha ocurrido un error en el servidor por favor reintente", {
                    iconPack: 'fontawesome',
                    type: 'error',
                    theme: 'toasted-primary',
                    icon: 'close',
                    duration: 4000,
                    position: 'top-center',
                    closeOnSwipe: true,
                    keepOnHover: true
                });
                this.$store.dispatch('error');
            })
        },
        resetear_pdf() {
            this.$parent.url = '';
        }
    },
}
</script>

<style lang="css">
#modalPdf .modal-dialog {
    min-width: 100%;
    height: 100%;
    margin: 0px auto 0px auto;
    padding: 0;
}

#modalPdf .modal-content {
    height: auto;
    min-height: 100%;
    border-radius: 0;
}

#modalPdf .modal-dialog .modal-header {
    background-color: #5c6873 !important;
    border-radius: 0px !important;
    color: #fff;
    border: none !important;
}

#modalPdf .modal-dialog .modal-header h5 {
    font-size: 16px;
}

#modalPdf .modal-dialog .close {
    color: #fff;
}

#modalPdf .modal-dialog .modal-body {
    font-size: 18px;
    border: none !important;
    text-align: center;
    margin-top: 0px;
    color: #5f5f5f !important;
}

#modalPdf .modal-dialog .modal-footer button {
    margin-top: 5px;
    border-radius: 0px !important;
    font-weight: bold;
    padding: 10px 40px 10px 40px;
    margin-right: auto !important;
    margin-left: auto !important;
}
</style>
