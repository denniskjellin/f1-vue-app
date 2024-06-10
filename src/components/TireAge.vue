<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">Drivers</h1>
    <div v-if="isLoading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <p>Loading...</p>
    </div>
    <div v-else>
      <div v-if="driverData && driverData.length > 0" class="row">
        <div v-for="item in driverData" :key="item.driver_number" class="col-md-4 mb-4">
          <div :class="['card', 'h-100', getTeamClass(item.team_name)]">
            <div class="card-body text-center">
              <img :src="item.headshot_url" alt="Driver headshot" class="headshot mb-3">
              <h5 class="card-title">{{ item.first_name }} {{ item.last_name }}</h5>
              <p class="card-text">{{ item.team_name }}</p>
              <p>#{{ item.driver_number }}</p>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-center">No data available</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'AboutPage',

  setup() {
    const driverData = ref([]);
    const isLoading = ref(true);

    const fetchDriverData = async () => {
      try {
        const url = `https://api.openf1.org/v1/drivers?&session_key=latest`;
        const response = await fetch(url);
        const driverResponse = await response.json();
        driverData.value = driverResponse.sort((a, b) => a.team_name.localeCompare(b.team_name));
        isLoading.value = false;
      } catch (error) {
        console.error('Error fetching driver data:', error);
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchDriverData();
    });

    const getTeamClass = (teamName) => {
      switch (teamName.toLowerCase()) {
        case 'mercedes':
          return 'team-mercedes';
        case 'red bull racing':
          return 'team-redbull';
        case 'ferrari':
          return 'team-ferrari';
        case 'mclaren':
          return 'team-mclaren';
        case 'aston martin':
          return 'team-astonmartin';
        case 'kick sauber':
          return 'team-kicksauber';
        case 'haas f1 team':
          return 'team-haas';
        case 'williams':
          return 'team-williams';
        case 'alpine':
          return 'team-alpine';
        case 'rb':
          return 'team-rb';
        default:
          return '';
      }
    };

    return {
      driverData,
      isLoading,
      getTeamClass
    };
  }
};
</script>

<style scoped>
.headshot {
  width: 100px;
  height: auto;
  border-radius: 50%;
  margin-right: 10px;
  background-color: rgb(226, 226, 226);
}

.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f7f4f1;
  color: #15151E;
}

/* Custom styles for each team */
.team-mercedes {
  border-left: 5px solid #27F4D2;
}

.team-redbull {
  border-left: 5px solid #3671C6;
}

.team-ferrari {
  border-left: 5px solid #E80020;
}

.team-mclaren {
  border-left: 5px solid #FF8000;
}

.team-astonmartin {
  border-left: 5px solid #006f62;
}

.team-kicksauber {
  border-left: 5px solid #52E252;
}

.team-haas {
  border-left: 5px solid #B6BABD;
}

.team-williams {
  border-left: 5px solid #64C4FF;
}

.team-alpine {
  border-left: 5px solid #0093cc;
}

.team-rb {
  border-left: 5px solid #6692FF;
}

/* Add more teams as needed */
</style>
