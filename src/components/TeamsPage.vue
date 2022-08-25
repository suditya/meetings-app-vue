<template>
  <div>
    <NavBar />
    <h2 class="mx-4 p-3">Teams</h2>
    <div class="d-flex row justify-content-center">
      <div
        v-for="item in teamsList"
        v-bind:key="item._id"
        class="card col-12 col-lg-3 m-4 bg-info sm-1"
        style="min-width: 18rem"
      >
        <div class="card-body">
          <h5 class="card-title">{{ item.name }}</h5>
          <p class="card-text">{{ item.description }}</p>
          <button @click="removeMember(item._id)" class="btn btn-danger">
            Excuse yourself
          </button>

          <div>
            <div>
              <div class="fw-bold attendees mt-3">Members:</div>
              <div class="email">
                <p>{{ showAttendees(item.members) }}</p>
              </div>
            </div>
          </div>
          <div>
            <select name="email" v-model="key" style="max-width: 200px">
              <option
                v-for="attendees in attendeesEmails"
                v-bind:key="attendees.id"
              >
                {{ attendees.email }}
              </option>
            </select>

            <button @click="addMember(item._id)" class="button">Add</button>
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
// import { fetchTeamsById } from "@/services/teams";

export default {
  name: "TeamsPage",
  components: {
    NavBar,
  },

  data() {
    return {
      teamsList: "",
      attendeesEmails: "",
      key: ""
    };
  },
  methods: {
    async removeMember(id) {
      await axios.patch(
        `${config.baseUrl}/api/teams/${id}?action=remove_member`,
        id,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      alert("You left the team");
    },
    async addMember(id) {
      await axios.patch(
        `${config.baseUrl}/api/teams/${id}?action=add_attendee&email=${this.key}`,
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
      attendees.forEach((members) => {
        emailArray = emailArray + `${members.email}, `;
      });
      return emailArray;
    },
  },

  async mounted() {
    await axios
      .get(`${config.baseUrl}/api/teams`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.teamsList = response.data;
      });

    await axios
      .get(`${config.baseUrl}/api/users`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.attendeesEmails = response.data;
      });
  },
};
</script>

<style scoped>
.button {
  background-color: lightseagreen;
  padding: 5px 10px;
  border: none;
  color: white;
  border-radius: 5px;
  font-size: 18px;
  margin-left: 10px;
}
</style>