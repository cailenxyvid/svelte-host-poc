<script>
  // import utilities 
  import Router from 'svelte-spa-router'

  // import top level components/views (routes)
  import Dashboard from "./components/Dashboard/Dashboard.svelte"
  import Event from './components/Event/Event.svelte'

  // declare routes 
  const routes = {
    '/': Dashboard,
    '/event/:id': Event
}

</script>

<main>
  <Router {routes}/>
</main>