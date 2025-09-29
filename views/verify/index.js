const textInfo = document.querySelector('#text-info');

(async() => {
try{
const token = window.location.pathname.split('/')[3];
const id = window.location.pathname.split('/')[2];
console.log(id);
await axios.patch(`/api/users/${id}/${token}`);
//window.location.pathname = '/login/';
console.log(data);
} catch (error) {
    textInfo.innerHTML = error.res.data.error;
}
})();