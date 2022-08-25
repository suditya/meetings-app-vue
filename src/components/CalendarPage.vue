<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="todays-date">
        <h3 class="todays-date" id="today-date"></h3>
        <input type="date" class="calender-block" 
        id="myDate" v-model="choosenDate" v-on:change="getMeetingsOfDay">
      </div>
      <div >Calendar</div>
      <p style="backgroun-color:lightgreen">There are {{meetingsArray.length}} meetings</p>
    </div>
    <div v-for="dynamic in meetingsArray" :key="dynamic" >
    <div v-bind:style=dynamic>
    </div>
    </div>
    <div class="calender-details meeting-time-box-container" v-for="index in 24" :key="index">
      <div class="time-box-container">
        <CalendarDates :hour=index></CalendarDates>
      </div>
    </div>
  </div>
</template>

<script>

import NavBar from "./NavBar.vue";
import config from "@/config";
import axios from "axios";
import CalendarDates from "./CalendarDates.vue";
export default {
  name: 'CalendarPage',
   data() {
    return {
      toDate:"",
      calendarAttributes:"",
      choosenDate:"",
      meetings:{},
      meetingsArray:[],
    };
  },
  methods:
  {
    addEvents()
    {
      return 0;
    }
    ,
    todayDateDay()
    {
      
      let date= new Date();
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0'); 
      const yyyy = date.getFullYear();
      date= yyyy+'-'+mm + '-' + dd;
      this.choosenDate=date;
      this.getMeetingsOfDay();
    },
    async getMeetingsOfDay()
    {
      const result=
         await axios.get(
        `${config.baseUrl}/api/calendar?date=${this.choosenDate}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
        
      )
      this.meetings=result.data;
      this.showMeetings();

    }
    ,
    showMeetings()
    {
        this.meetings.forEach(meeting => {
        const divStart=((132+91*(meeting.startTime.hours-1))+(meeting.startTime.minutes /60)*91);
        const divEnd=((132+91*(meeting.endTime.hours-1))+(meeting.endTime.minutes /60)*91);

        
        const divHeight=divEnd-divStart;
        // console.log(meeting.startTime,meeting.endTime)
        // console.log(divStart,divEnd,divHeight)
        const dynamicStyle=`width: 83.5%;
            background-color: rgb(139 135 135);
            color: white;
            height: ${divHeight}px;
            margin: 0 auto;
            position: absolute;
            top: ${divStart}px;
            left: 8.1%;
            opacity: 0.897;`            
      this.meetingsArray.push(dynamicStyle);
      });
      
    }
  },
  components:{
    NavBar,
    CalendarDates
}
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.todays-date {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
}
.calender-details {
  width: 89%;
  margin: 0 auto;
  font-size: 13px;
  margin-top: 10px;

}

.meeting-detail-div {
  width: 85%;
  margin: 0px auto;
  height: 80px;
  background-color: #0DCAF0
}
.grey
{
    width: 85.9%;
    background-color: rgb(139 135 135);
    color: rgb(195, 195, 195);
    height: 80px;
    margin: 0 auto;
    position: absolute;
    top: 60px;
    /* top: 130px; */
    left: 7.1%;
    opacity: 0.897;
   
}


</style>