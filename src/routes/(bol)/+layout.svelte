<script lang="ts">
</script>

<svelte:head>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Oswald&family=Oxygen&family=Space+Mono&family=Trispace&display=swap" rel="stylesheet">
  


  <style>
    * {
      font-family: 'roboto', 'Space Mono', 'Oswald', 'Oxygen', 'sans-serif';
      font-weight: 600;
      font-size: 10px;
      background-color: #fff;
    }
    input[type='checkbox'] {
      height: 20px;
      width: 20px;
    }
    input {
      background-color: white;
      border: 1px solid gray;
    }
    div.notice {
      font-size: 10px;
    }
    label > input[type='checkbox'] {
      margin-right: 5px;
    }

    .note {
      font-size: 10px;
    }
    .mainPrint {
      width: 200mm !important;
      min-height: 287mm !important;
      max-height: 287mm !important;
      max-width: 200mm !important;
    }

    .notices h3 {
      font-size: 8px !important;
      font-weight: 400;
    }
    th {
      height: '40';
      font-size: 10px;
      font-weight: 600;
      text-align: center;
      border-collapse: collapse;
      border-width: 1px;
    }
    td {
      font-family: Roboto;
      font-size: 10px;
      font-weight: bold;
      text-align: center;
      border-collapse: collapse;
      border-width: 1px;
    }
    td.total {
      font-size: 10px;
      font-weight: bold;
      text-align: center;
    }
    h4{
      text-transform: capitalize;
    }
  </style>
</svelte:head>
<slot />
