<template
  ><v-container>
    <v-row>
      <v-carousel :show-arrows="false">
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>
    </v-row>
    <v-row
      ><div class="about-div">
        <h3>Vision</h3>
        <p>
          The Current scenario is drastically changing the education-system and
          that too at an alarming fast rate. It is in a transforming state from
          offline to online it is the conventined modes.
        </p>
        <p>
          students see themselves as smart hardworking and even more innovative
          than past generations. they are also native technology users which
          gives them the competitive edge for thriving in a future work force
          that relies increasingly on technology.
        </p>
        <p>
          But as educators, all of us seeking to prepare students for their
          future cannot afford overlook the value of creativity. That where we
          step in.... our Team focuses on Blended Learning. We predominantly
          focus on making studies emphasize.
        </p>
      </div></v-row
    ></v-container
  >
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped>
.about-div {
  margin: auto;
  background-color: whitesmoke;
  color: rgb(184, 138, 79);
  box-shadow: 3px solid burlywood;
  text-transform: capitalize;
  padding: 15px;
  width: 90%;
  text-align: center;
  justify-content: center;
}
</style>
