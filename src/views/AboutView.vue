<template>
  <div class="about">
    <h1>This is an about page</h1>
    <template v-if="isLoading">
      <p>Loading...</p>
    </template>
    <template v-else>
      <table v-if="data && data.length > 0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Driver Number</th>
            <th>RPM</th>
            <th>Speed</th>
            <th>Gear</th>
            <th>Throttle</th>
            <th>DRS</th>
            <th>Brake</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ data[0].date }}</td>
            <td>{{ data[0].driver_number }}</td>
            <td>{{ data[0].rpm }}</td>
            <td>{{ data[0].speed }}</td>
            <td>{{ data[0].n_gear }}</td>
            <td>{{ data[0].throttle }}</td>
            <td>{{ data[0].drs }}</td>
            <td>{{ data[0].brake }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>No data available</p>
    </template>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'About',

  setup() {
    // Reactive variables
    const data = ref([]);
    const isLoading = ref(true);
    let intervalId = null;

    // Function to fetch data from the API
    const fetchData = () => {
      const url = `https://api.openf1.org/v1/car_data?driver_number=1&session_key=latest`;
      fetch(url)
        .then(response => response.json())
        .then(apiData => {
          data.value = apiData;
          isLoading.value = false;
          console.log('Data fetched:', data.value);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          isLoading.value = false;
        });
    };

    // Set up polling to fetch data at regular intervals
    onMounted(() => {
      fetchData(); // Initial fetch
      intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds
    });

    // Clean up the interval on component unmount
    onUnmounted(() => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    });

    return {
      data,
      isLoading
    };
  },
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
