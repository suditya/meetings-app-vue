<template>
<div v-if="{emailID}">
  <div v-show="display" class="alert alert-primary position-fixed" role="alert">
      Meeting added successfully
      <button @click="onClick" type="button">
        <span>&times;</span>
      </button>
    </div>
 <NavBar />
  <div  class="add_a_new_meeting_box">
   
        <h2 class="block">Meetings</h2>
        <div class="links">
            <router-link to="/meetings/filter" style="margin:4px" id="filter-meeting" class="link-plain pd-5">Filter/Search meeting</router-link>
            <router-link to="/meetings/add" id="add-meeting" class="link-plain pd-5">Add a meeting</router-link>
        </div>
        <hr class="line">
        <!-- </div> -->
        <form @submit.prevent="addMeeting" id="container">
          <h2 class="h2">Add a new meeting</h2>
          <hr />
          <div class="form_for_meeting">
            <div class="form_for_meeting_items">
              <div>
                <label for="name">Name of the Meeting</label>
              </div>
              <div class="name">
                <input v-model="name" type="text" id="name" name="name" />
              </div>
            </div>
    
            <div class="form_for_meeting_items">
              <div>
                <label for="date">Date</label>
              </div>
              <div class="date">
                <input v-model="date" type="date" id="date" name="date" />
              </div>
            </div>
    
            <div class="form_for_meeting_items">
              <div>
                <label for="time">Start time (hh:mm)</label>
              </div>
              <div class="start_time">
                <input
                  v-model="startTime"
                  type="time"
                  name="start_time"
                  id="start_time"
                />
              </div>
            </div>
            <div class="form_for_meeting_items">
              <div>
                <label for="time">End time (hh:mm)</label>
              </div>
              <div class="end_time">
                <input
                  v-model="endTime"
                  type="time"
                  name="end_time"
                  id="end_time"
                />
              </div>
            </div>
    
            <div class="form_for_meeting_items">
              <div>
                <label for="textarea">Description</label>
              </div>
              <div class="textarea_for_agenda">
                <textarea
                  v-model="description"
                  id="textarea_for_agenda"
                  name="textarea"
                  placeholder="What is the agendra of the meeting ?"
                ></textarea>
              </div>
            </div>
    
            <div class="form_for_meeting_items">
              <div>
                <label for="textarea">Email IDs of attendees, or teams short</label>
              </div>
              <div class="textarea_for_emails">
                <textarea
                  v-model="email"
                  id="textarea_for_emails"
                  name="textarea"
                  placeholder="john@example.com, @annual-day, mark@example.com"
                ></textarea>
              </div>
            </div>
    
            <div>
              <p>
                Saparate email IDs / team short name by commas - team short name
                always begin with @
              </p>
            </div>
    
            <div class="primary_button">
              <button class="button">Add meeting</button>
            </div>
          </div>
        </form>
      </div>
  </div>
</template>

<script>
import config from "@/config";
import axios from "axios";
import NavBar from "./NavBar.vue";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      name: "",
      date: "",
      startTime: "",
      endTime: "",
      description: "",
      email: "",
      display:false,
    };
  },
  props:{
    loggenIn:Boolean,
    emailID:String
  },
  methods: {
    async addMeeting() {
      const getHour = (time) => {
        return time[0] + time[1];
      };
      const getMin = (time) => {
        return time[3] + time[4];
      };
      const startTimeHour = getHour(this.startTime);
      const startTimeMin = getMin(this.startTime);

      const endTimeHour = getHour(this.endTime);
      const endTimeMin = getMin(this.endTime);

      const startTimeObj = {
        hours: startTimeHour,
        minutes: startTimeMin,
      };

      const endTimeObj = {
        hours: endTimeHour,
        minutes: endTimeMin,
      };
      const attendeesArray = this.email.split(",");
      const credentials = {
        name: this.name,
        date: this.date,
        startTime: startTimeObj,
        endTime: endTimeObj,
        description: this.description,
        attendees: attendeesArray,
      };
      console.log(credentials);
      // console.log(localStorage.getItem("email"));
      const response = await axios.post(
        `${config.baseUrl}/api/meetings`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      alert("Meeting added successfully");
      this.$router.push({name:'searchMeetings'})
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
.links
{
  display: block;
  margin: 20px 0px -14px 66px;
}
.line
{
  width: 93%;
  margin:2px auto 10px auto  ;
}
#add-meeting
{
  border: 1px solid grey;
  padding: 2px 5px;
  borer-radius: 64px;
  border-radius: 6px;
  background-color: white;
  border-bottom: 1px solid white;
}
.block {
  margin: 10px auto;
  padding: 0px 30px;
  font-size: 30px;
}

.router-links {
  display: flex;
  margin: 10px 10px;
  padding: 20px 30px;
}

.router-links a:hover {
  color: blue;
}

.router-links div {
  margin-left: 20px;
}

.link-plain {
  text-decoration: none;
  /* color: initial; */
  color: grey;
}

#container {
  background-color: #0dcaf0;
  margin: 10px auto;
  padding: 20px 30px;
  border-radius: 10px;
  width: 93%;
  margin: 0px auto;
}

.form_for_meeting_items {
  margin: 20px 0px;
}

.form_for_meeting_items div {
  margin: 10px 0px;
}

.form_for_meeting_items .textarea_for_agenda textarea {
  width: 100%;
  height: 60px;
  border-radius: 5px;
}

.form_for_meeting_items .date input,
.name input,
.form_for_meeting_items .textarea_for_emails textarea {
  width: 100%;
  border-radius: 5px;
}

.form_for_meeting_items .start_date,
.form_for_meeting_items .date input,
.name input {
  height: 30px;
  border-radius: 5px;
}

.form_for_meeting p {
  color: white;
  margin: -20px 0px;
}

.form_for_meeting .primary_button {
  margin: 50px 0px;
}

.button {
  background-color: lightseagreen;
  padding: 5px 10px;
  border: none;
  color: white;
  border-radius: 5px;
  font-size: 18px;
}

.nav-bar .my-meetings {
  margin: 15px;
  font-size: 24px;
  display: none;
}
</style>