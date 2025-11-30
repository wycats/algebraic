<script>
	let count = $state(0);

	function increment() {
		count += 1;
	}
</script>

<div class="reproduction-box">
	<h3>Minimal Reproduction</h3>
	<p>Count: {count}</p>
	<button onclick={increment}>Increment</button>
</div>

<style>
	.reproduction-box {
		border: 2px solid red;
		padding: 1rem;
		margin: 1rem 0;
	}
</style>
