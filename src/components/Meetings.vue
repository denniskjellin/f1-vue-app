<template>
  <div class="container">
    <h1>Meetings Component</h1>
    <div v-if="isLoading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <p>Loading...</p>
    </div>
    <div v-else>
      <div class="w-100" v-if="meetings && meetings.length > 0">
        <div v-for="item in meetings" :key="item.meeting_id" class="meeting mb-4">
          <h5 class="card-title">{{ item.meeting_official_name }}</h5>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'Meetings',

  setup() {
    const meetings = ref([])
    const isLoading = ref(true);
    const error = ref(null);

    const fetchMeetings = async () => {
      try {
        const response = await fetch('https://api.openf1.org/v1/meetings?year=2024');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        meetings.value = data;
        console.log(data);
      } catch (err) {
        error.value = err.toString();
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchMeetings();
    });

    return { meetings, isLoading, error }
  }
}
</script>

<style scoped lang='scss'>
.meeting {
  border: solid red 1px;
  background-color: black;
}
</style>