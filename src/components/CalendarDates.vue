<template>
  <div class="hours-container">
          {{hour}}
    <div class="meeting-detail-div"></div>
  </div>
</template>

<script>
export default 
{
    name: 'CalendarDates',
    props: {
    hour:Number,
  }
}
</script>

<style>
    .hours-container {
    display: flex;
    justify-content: space-between;
    margin: 1% 1% 1% 0;
    }
    /* .time-box {
    width: 25px;
    font-size: 19px;
    } */
    .calender-details .meeting-detail-div {
    width: 97%;
    margin: 0px auto;
    height: 80px;
    background-color: #0DCAF0
    }
</style>