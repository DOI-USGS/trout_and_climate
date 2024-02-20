 <template>
  <div class='container'>
    
  </div>
</template>

  <script>


  import { onMounted, ref, reactive } from "vue";
  import * as d3 from 'd3';

  export default {
    setup() {
     
      const publicPath = import.meta.env.BASE_URL;

      onMounted(() => {
          loadData();
          const pageHeight = window.innerHeight;

      });
      function loadData() {
        /* let promises = [
        d3.csv(publicPath + ), 
      ];*/
      Promise.all(promises).then(callback)
      }
      function callback(data) {
          /* keyMessages = data[0]; */
      }

    return {
          /* populate with return items */
    };
  }
}

  </script>
  
  
  <style>

.container {
  width: 100%;
  height: 100vh;
  background: transparent;
  overflow: hidden
}
  
.text-container {
    width: 100%; /* Full width on mobile */
    max-width: 500px; /* Maximum width of the textbox */
    padding: 10px;
  /*  border: 1px solid #ccc; */
    border-radius: 4px;
    margin: 20px;
}
/* Styles for larger screens */
@media (min-width: 600px) {
    .text-container {
        margin: 0 auto; /* Center the container */
        margin-top: 25px;
        max-width: 1000px; /* Maximum width of the container */
    }
  }
  
  </style>
  