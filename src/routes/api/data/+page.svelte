<script>
  /** @type {import('./$types').PageData} */
  export let data;
  // Convert the object to an array of [key, value] pairs

  // Extract the values (objects) from the data object
  const values = Object.values(data);

  // Sort the array by the count value
  values.sort((a, b) => b.count - a.count);

  console.log(values);

  console.log(values);
</script>

<table>
  <thead>
    <tr>
      <th>Profile</th>
    </tr>
  </thead>
  <tbody>
    {#each values as value, index}
      {#if index > 400 && index < 500}
        <tr>
          <td><a href={value.profile} target="_blank">{value.profile}</a></td>
        </tr>
      {/if}
    {/each}
  </tbody>
</table>

<style>
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th,
  td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
</style>
