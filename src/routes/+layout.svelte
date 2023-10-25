<script lang="ts">
    import "../scss/base.scss";
</script>

<header class="container">
    <nav>
        <ul>
            <li>
                <strong>ge-skiller</strong>
            </li>
        </ul>
    
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/item-browser">Item Browser</a></li>
        </ul>
    </nav>
</header>

<main class="container">
    <slot />
</main>

<footer class="container"></footer>
