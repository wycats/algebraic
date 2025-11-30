<script>
  let count = 0;
  function increment() {
    count += 1;
  }
</script>

<div style="padding: 2rem; border: 2px dashed blue;">
  <h3>Debug Component (Legacy)</h3>
  <button on:click={increment}>
    Count is {count}
  </button>
</div>
