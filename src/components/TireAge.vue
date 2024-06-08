<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">Session</h1>
    <div v-if="isLoading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <p>Loading...</p>
    </div>
    <div v-else>
      <div v-if="mergedData && mergedData.length > 0" class="row">
        <div v-for="item in mergedData" :key="item.driver_number" class="col-md-4 mb-4">
          <div :class="['card', 'h-100', getTeamClass(item.team_name)]">
            <div class="card-body text-center">
              <img :src="item.headshot_url" alt="Driver headshot" class="headshot mb-3">
              <h5 class="card-title">{{ item.full_name }}</h5>
              <p class="card-text"><strong>Position:</strong> {{ item.position }}</p>
              <p class="card-text"><strong>Compound:</strong> {{ item.compound }}</p>
              <p class="card-text"><strong>Tire Age:</strong> {{ calculateTireAge(item.lap_start, item.lap_end) }} laps</p>
              <p class="card-text"><strong>Team:</strong> {{ item.team_name }}</p>
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
    const tireData = ref([]);
    const driverData = ref([]);
    const positionData = ref([]);
    const mergedData = ref([]);
    const isLoading = ref(true);

    const fetchTireData = () => {
      const url = `https://api.openf1.org/v1/stints?session_key=latest&tyre_age_at_start%3E=0`;
      return fetch(url).then(response => response.json());
    };

    const fetchDriverData = () => {
      const url = `https://api.openf1.org/v1/drivers?&session_key=latest`;
      return fetch(url).then(response => response.json());
    };

    const fetchPositionData = () => {
      const url = `https://api.openf1.org/v1/position?meeting_key=latest`;
      return fetch(url).then(response => response.json());
    };

    const fetchData = async () => {
      try {
        const [tireResponse, driverResponse, positionResponse] = await Promise.all([fetchTireData(), fetchDriverData(), fetchPositionData()]);
        tireData.value = getLatestDriverData(tireResponse);
        driverData.value = driverResponse;
        positionData.value = positionResponse;
        mergeData();
        isLoading.value = false;
      } catch (error) {
        console.error('Error fetching data:', error);
        isLoading.value = false;
      }
    };

    const getLatestDriverData = (apiData) => {
      const driverDataMap = new Map();

      apiData.forEach(item => {
        if (!driverDataMap.has(item.driver_number) || item.lap_end > driverDataMap.get(item.driver_number).lap_end) {
          driverDataMap.set(item.driver_number, item);
        }
      });

      return Array.from(driverDataMap.values());
    };

    const mergeData = () => {
      const driverMap = new Map(driverData.value.map(driver => [driver.driver_number, driver]));
      const positionMap = new Map(positionData.value.map(position => [position.driver_number, position]));

      mergedData.value = tireData.value.map(tire => ({
        ...tire,
        full_name: driverMap.get(tire.driver_number)?.full_name || 'Unknown',
        team_name: driverMap.get(tire.driver_number)?.team_name || 'Unknown',
        headshot_url: driverMap.get(tire.driver_number)?.headshot_url || 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/driver_fallback_image.png',
        position: positionMap.get(tire.driver_number)?.position || 'N/A'
      })).sort((a, b) => {
        // Sort by position (if available), otherwise keep the original order
        if (a.position === 'N/A' && b.position === 'N/A') {
          return 0;
        } else if (a.position === 'N/A') {
          return 1;
        } else if (b.position === 'N/A') {
          return -1;
        } else {
          return a.position - b.position;
        }
      });
    };

    onMounted(() => {
      fetchData();
    });

    const calculateTireAge = (lapStart, lapEnd) => {
      return (lapEnd !== null && lapEnd > lapStart) ? lapEnd - lapStart : 0;
    };

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
      mergedData,
      isLoading,
      calculateTireAge,
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
  border-left: 5px solid #00d2be;
}

.team-redbull {
  border-left: 5px solid #1e41ff;
}

.team-ferrari {
  border-left: 5px solid #dc0000;
}

.team-mclaren {
  border-left: 5px solid #ff8700;
}

.team-astonmartin {
  border-left: 5px solid #006f62;
}

.team-kicksauber {
  border-left: 5px solid #06bb0f;
}

.team-haas {
  border-left: 5px solid #f0d787;
}

.team-williams {
  border-left: 5px solid #005aff;
}

.team-alpine {
  border-left: 5px solid #e00dc4;
}

.team-rb {
  border-left: 5px solid #1e41ff;
}



/* Add more teams as needed */
</style>
