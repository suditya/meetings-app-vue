<template>
  <div>
    <NavBar />
    <h2 class="block">Meetings</h2>
    <div class="d-flex m-4 p-2 links">
      <router-link
        to="/meetings/filter"
        class="text-primary text-decoration-none"
        
        ><div class="search-meeting" id="filter-meeting">
          Filter/Search meeting
        </div></router-link
      >
      <router-link
        to="/meetings/add"
        class="text-secondary text-decoration-none"
        ><div>Add a meeting</div></router-link
      >
    </div>
    <hr class="line">
    <form @submit.prevent="searchMeeting" id="container">
      <h2>Search for meeting</h2>
      <hr />
      <div class="meeting-form">
        <div class="meeting-form-item">
          <div>
            <label for="date">Date</label>
          </div>
          <div class="date">
            <select v-model="date" id="date" name="date">
              <option value="all" selected>ALL</option>
              <option value="past">PAST</option>
              <option value="present">TODAY</option>
              <option value="future">UPCOMING</option>
            </select>
          </div>
        </div>

        <div class="meeting-form-item">
          <div>
            <label for="textarea">Search meeting name</label>
          </div>
          <div class="keywords">
            <textarea
              v-model="keywords"
              id="keywords"
              name="keywords"
              placeholder="Search using words which describe the meeting"
            ></textarea>
          </div>
        </div>
        <div class="primary_button">
          <button class="button">Search</button>
        </div>
      </div>
    </form>

      <h2 class="m-5 mx-4">Meetings matching search criteria</h2>
      <hr class="line">
      

    <div
      v-for="item in list"
      v-bind:key="item._id"
      
      style="min-width: 18rem"
    >
      <div class=" container-box" style="margin: 15px auto;">
        <div class="">
          <h5 class="card-text mx-2">
            {{ showDate(item.date) }}
          </h5>
          <h5 class="card-text fw-normal">
            {{ item.startTime.hours }}:{{ item.startTime.minutes }} -
            {{ item.endTime.hours }}:{{ item.endTime.minutes }}
          </h5>
        </div>
        <p class="card-title mx-2 mt-2 text-capitalize">{{ item.name }}</p>
        <button @click="removeAttendee(item._id)" class="btn btn-danger mx-2">
          Execuse yourself
        </button>

        <div>
          <div class="card-title d-flex mt-3">
            <h5 class="card-text mx-2">Attendees:</h5>
            <p>{{ showAttendees(item.attendees) }}</p>
          </div>
          <div class="card-title mx-2 attendees-box">
            <select name="email" v-model="key" style="max-width: 200px">
              <option
                v-for="attendees in attendeesEmails"
                v-bind:key="attendees.id"
              >
                {{ attendees.email }}
              </option>
            </select>
            <button @click="addAttendee(item._id)" class="button">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config";
import NavBar from "./NavBar.vue";

export default {
  components: {
    NavBar,
  },

  data() {
    return {
      date: "",
      keywords: "",
      list: "",
      attendeesEmails: "",
      key: "",
    };
  },

  methods: {
    async removeAttendee(id) {
      await axios.patch(
        `${config.baseUrl}/api/meetings/${id}?action=remove_attendee`,
        id,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      alert("success");
    },
    async addAttendee(id) {
      await axios.patch(
        `${config.baseUrl}/api/meetings/${id}?action=add_attendee&email=${this.key}`,
        this.key,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      alert("success");
    },
    showAttendees(attendees) {
      let emailArray = "";
      attendees.forEach((attendee) => {
        emailArray = emailArray + `${attendee.email}, `;
      });
      return emailArray;
    },

    showDate(date) {
      let dateString = "";
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const dateObj = new Date(date);
      dateString += `${dateObj.getDate()} `;
      dateString += `${monthNames[dateObj.getMonth()]} `;
      dateString += `${dateObj.getFullYear()}`;
      return dateString;
    },

    async searchMeeting() {
      const credentials = {
        period: this.date,
        search: this.keywords,
      };
      await axios
        .get(
          `${config.baseUrl}/api/meetings?period=${credentials.period}&search=${credentials.search}`,
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          this.list = response.data;
        });

      const result = await axios.get(`${config.baseUrl}/api/users`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      this.attendeesEmails = result.data;
    },
  },
};
</script>


<style scoped>
* {
  box-sizing: border-box;
}
.block {
  margin: 5px 9px -11px 0px;
  padding: 0px 30px;
  font-size: 30px;
}
.line
{
  width: 94%;
  margin: -40px auto 10px auto;
}
#filter-meeting
{
  border: 0.5px solid grey;
  padding: 0px 3px;
  borer-radius: 50px;
  border-radius: 8px;
  background-color: white;
  margin: 0px 5px -4px 22px;
  border-bottom: 1px solid white;
}
.links
{
  display: block;
  margin: 20px 0px -14px 66px;
}
#container {
  background-color: #0dcaf0;
  margin: 10px auto;
  padding: 20px 30px;
  border-radius: 10px;
  width: 94%;
}
.container-box {
    margin: 20px auto;
    padding:20px 20px;
    border: 0.5px solid grey;
    width: 94%;
    border-radius: 25px;
}
.meeting-form-item {
  margin: 20px 0px;
}

.meeting-form-item div {
  margin: 10px 0px;
}

.meeting-form-item .textarea_for_agenda textarea {
  width: 100%;
  height: 60px;
  border-radius: 5px;
}

.meeting-form-item .date input,
.name input,
.meeting-form-item .textarea_for_emails textarea {
  width: 100%;
  border-radius: 5px;
}

.meeting-form-item .start_date,
.meeting-form-item .date input,
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
  margin-left: 10px;
}

.nav-bar .my-meetings {
  margin: 15px;
  font-size: 24px;
  display: none;
}

.meeting-form-item .date select,
.meeting-form-item textarea {
  width: 100%;
  border-radius: 5px;
}

.container-box {
  margin: 10px 40px;
  padding: 20px;
  border: 1px solid black;
}
.meeting-form-item .date select {
  height: 30px;
}

@media (max-width: 500px) {
  .attendees-box {
    display: block;
  }
}
</style>