<template>
  <div>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">비밀번호 수정</button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">비밀번호 수정</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="exampleInputPassword1">현재 비밀번호</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password.old_password">
                    <small id="emailHelp" class="form-text text-muted">문자, 숫자, 기호를 모두 포함하여 8자 이상 입력해주세요.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">새로운 비밀번호</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password.new_password1">
                    <small id="emailHelp" class="form-text text-muted">문자, 숫자, 기호를 모두 포함하여 8자 이상 입력해주세요.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">새로운 비밀번호 확인</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password.new_password2">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="passwordupdate">Save changes</button>
            </div>
            </div>
        </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
const BACK_URL = 'http://127.0.0.1:8000'

export default {
    name:"PasswordUpdate",
    data(){
        return {
            password:{
            old_password:'',
            new_password1:'',
            new_password2:'',
            },
            config:'',
        }
    },
    methods:{
        getconfig(){
            const axiosConfig = {
            headers:{
                Authorization: `Token ${this.$cookies.get('auth-token')}`,
            }
        }
        this.config = axiosConfig
        },
        passwordupdate(event){
        event.preventDefault()
        axios.post(`${BACK_URL}/rest-auth/password/change/`, this.password, this.config)
            .then((response) => {
                console.log(response)
                this.$alert("비밀번호가 변경 되었습니다.")
            })
            .catch((error) => {
                console.log(error)
                this.$alert("비밀번호 재 입력 바랍니다.")
            })
        },
    },
    created(){
        this.getconfig()
    },
}
</script>

<style>

</style>