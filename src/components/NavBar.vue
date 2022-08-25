<template>
<div>
    <div class="nav-bar">
      <div class="left list-unstyled">
        <router-link to="/calendar" class="link-plain"><div>Calender</div></router-link>
        <router-link to="/meetings/filter" class="link-plain"><div>Meetings</div></router-link>
        <router-link to="/teams" class="link-plain"><div>Teams</div></router-link>
      </div>
      <div class="right list-unstyled">
        <div id="hello-user">hello {{email}} !</div>
        <div @click="logout" id="log-out">Logout</div>
      </div>
    </div>
    <div class="ham-container">
      <div class="ham-menu-heading">
        <h3>My Meetings</h3>
      </div>
      <div class="hamburger-menu">
        <a href="#">
          <div class="ham-menu-icon"></div>
          <div class="ham-menu-icon"></div>
          <div class="ham-menu-icon"></div>
        </a>
      </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      email: localStorage.getItem("email"),
    };
  },
  props:
  {
    activeNav:Boolean,
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
/* body
  {
    background-color: rgb(229, 82, 23);
  } */
.nav-bar {
  background-color: #eee;
  display: flex;
  justify-content: space-between;
}
.link-plain {
  text-decoration: none;
  /* color: initial; */
  color: grey;
}

.img-responsive {
  width: 100%;
}

.right
{
  display: flex;
  width:350px;
  justify-content: space-evenly;
  align-items: center;
}
.left
{
  display: flex;
  width:250px;
  justify-content: space-evenly;
  align-items: center;
}
.left a,.right a{
  display: block;
  padding: 0.7rem 0.2rem;
}

.left a:hover,.right a:hover{
  /* display: block; */
  background-color: #555;
  color:white;
}

.main
{
  margin: 10px auto ;
  width: 80%;
}
.links
{
  padding: 10px;
}
.links a
{
  text-decoration: none;
}
#add-meeting-form
{
  background-color: rgb(34, 177, 224);
  width:100%;
  padding: 20px;
  border-radius: 1%;
  color:black;
  /* color: white; */
  padding: 3% 1%;
}
.heading
{
color: white;
}
.date-details
{
display: flex;
}
input#date {width: 100%;padding: 3% 1%;}

input
{border-radius: 10px;border: 1px solid white;}
#date,#start-time,#end-time,#description,#emailID,.heading,#name
{padding: 1% 1%;border-radius: 9px;}
#description
{
width:100%;
padding: 2em 1em;
}
#attendees
{
width:100%;
padding: 3% 2%;
}
.add-meeting-button
{padding: 1% 0.5%;border-radius: 5%;background-color: steelblue;color: white;font-weight: 600;border: 0.5px;cursor: pointer;}
.ham-menu-icon
{
  width: 35px;
  height: 5px;
  background-color: black;
  margin: 6px 0;
}
.ham-container
{
  display: none;
  padding: 20px 23px;
  background-color: #e1dcdc;
}
.hamburger-menu
{
  position: absolute;
  top:2px;
  right:1px;
  display: none;
}
div#log-out {
  background-color: #d82424;
  color: white;
  font-family: system-ui;
  padding: 1%;
  /* border: 0.5px solid white; */
  cursor: pointer;
  border-radius: 8px;
}
#add-meeting {
  border: 1px solid grey;
  padding: 2px 5px;
  borer-radius: 64px;
  border-radius: 3px;
  background-color: white;
  border-bottom: 1px solid white;
}
@media only screen and (max-width:665px) 
{
  .add-meeting-form
  {
    background-color: rgb(34, 177, 224);
    width:100%;
    padding: 1%;
    border-radius: 1%;
    color:black;
    /* color: white; */
    padding: 3% 1%;
  }
  #date,#start-time,#end-time,#description,#emailID,.heading,#name
  {
    padding: 1% 0;
  }
  .main
  {
    /* margin: 10px auto ; */
    margin: 11px 11px;
    width: 92%;
  }
  .nav-bar
  {
    display: none;
  }
  .ham-container
  {
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    justify-content: space-between;
    /* align-items: flex-start; */
    margin: 0px 0px 7px 0px;
    border: 5px solid white;
    border-radius: 10px;
  }
  .hamburger-menu
  {
    position: absolute;
    top: 7px;
    right: 8px;
    display: flex;
    border: 1px solid grey;
    padding: 3px 6px;
    border-radius: 6px;
  }
}
</style>