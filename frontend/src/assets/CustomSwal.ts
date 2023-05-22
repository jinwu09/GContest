import Swal from "sweetalert2";

export const SwalDesign = Swal.mixin({
    toast: true,
    icon: 'success',
    position: 'bottom-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    // showClass: {
    //     popup: 'animate__animated animate__fadeInDown'
    //   },
    //   hideClass: {
    //     popup: 'animate__animated animate__fadeOutUp'
    //   },
    customClass:{
        popup: 'swal-container',
        title: 'swal-white-text',
        icon: 'swal-icon',
        htmlContainer: 'swal-white-text',
        timerProgressBar: 'swal-progress-bar',
        confirmButton: 'swal-confirm',
        cancelButton: 'swal-cancel'
    }
})