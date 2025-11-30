<script lang="ts">
	let count = $state(0);
	let name = $state('World');

	let doubleCount = $derived.by(() => {
		return count * 2;
	});
	let color = $derived(count % 2 === 0 ? 'red' : 'blue');

	function increment() {
		count += 1;
	}

    function complexCalculation(val: number) {
        return val * val;
    }

    let calculated = $derived.by(() => {
        return complexCalculation(count);
    });
</script>

<button onclick={increment} style:color={color}>
	Count is {count} (Double: {doubleCount}) (Calc: {calculated})
</button>

<input bind:value={name} />
<p>Hello {name}</p>
