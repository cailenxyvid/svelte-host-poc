<script>
  // import utilities 
  import Router from 'svelte-spa-router'

  // import top level components/views (routes)
  import Home from "./components/Home/Home.svelte"
  import Event from './components/Event/Event.svelte'

  // declare routes 
  const routes = {
    '/': Home,
    '/event/:id': Event
}

</script>

<main>
  <Router {routes}/>
</main>