<template>
  <div>
      <section class="vh-100">
        <div class="container-fluid border rounded">
          <div class="row">
            <div class="col-sm-6 text-black" >

              <div class="px-5 ms-xl-4">
                <i class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style="color: #709085;"></i>
              </div>

              <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

                <form style="width: 23rem;">

                  <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Log in</h3>

                  <div class="form-outline mb-4">
                    <input type="email" id="form2Example18" v-model="email" class="form-control form-control-lg" required  />
                    <label class="form-label" for="form2Example18">Email address</label>

                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="form2Example28" v-model="password"  class="form-control form-control-lg" required/>
                    <label class="form-label" for="form2Example28">Password</label>

                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-info btn-lg btn-block" @click="login({credentials})" type="button">Login</button>
                  </div>

                  
                  <p>Don't have an account? <router-link to="/register" class="link-info">Register here</router-link></p>
                </form>

              </div>

            </div>
            <div class="col-sm-6 px-0 d-none d-sm-block">
              <img src="https://images.pexels.com/photos/459335/pexels-photo-459335.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Login image" class="w-100 vh-100 opacity" style="object-fit: cover; object-position: left;">
            </div>
          </div>
        </div>
      </section>
  </div>
</template>

<script>
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
export default 
{

 data() {
            return {
                email:'',
                password:'',
                credentials:
                {
                  email:this.email,
                  name:this.name
                }
            };
        },
  methods:
  {

      async login(){

      const obj =
      {
        email: this.email,
        password:this.password
      }
      console.log("obj",obj);
      const response = await axios.post( `https://mymeetingsapp.herokuapp.com/api/auth/login`,obj, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      if(response.data.message!='Signed in sucessfully')
      {
        alert("EmailId or PassWord Doesnt match ,please retry ");
        return ;
      }
      
      


      const data = await response.data;
      // if(data)
      console.log("data",data);

      
      
      localStorage.setItem( 'token', data.token );
      localStorage.setItem( 'email', data.email );
      localStorage.setItem('name',data.name)

      alert("Signed in sucessfully");
      this.$router.push({name:'addMeetings', params: {loggenIn:true,emailID:data.email}})
}
}
}
</script>

<style scoped>
*
{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.bg-image-vertical {
position: relative;
overflow: hidden;
background-repeat: no-repeat;
background-position: right center;
background-size: auto 100%;
}

@media (min-width: 1025px) {
.h-custom-2 {
height: 100%;
}
}
</style >