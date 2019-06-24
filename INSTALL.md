## Installation

### Laravel
1. Create new laravel project
    ```
    composer create-project --prefer-dist laravel/laravel fm
    ```

2. Install file manager packend package
    ```
    composer require alexusmai/laravel-file-manager
    ```

3. Publish configuration file
    ```
    php artisan vendor:publish --tag=fm-config
    ```

4. Publish compiled and minimized js and css files
    ```
    php artisan vendor:publish --tag=fm-assets
    ```

5. Edit the content of `resources/views/welcome.blade.php` adding
    ```
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Styles -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css">
    <link rel="stylesheet" href="{{ asset('vendor/file-manager/css/file-manager.css') }}">

    ....

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12 py-3">
                <div id="fm"></div>
            </div>
        </div>
    </div>
    ...
    <!-- File manager js -->
    <script src="{{ asset('vendor/file-manager/js/file-manager.js') }}"></script>
    ```

### NPM
1. Install node dependencies
    ```
    npm install
    ```

2. Install file manager frontend package
    ```
    npm install laravel-file-manager --save
    ```

3. Change the content of `resources/js/app.js` to
    ```
    import Vue from 'vue';
    import Vuex from 'vuex';
    import FileManager from 'laravel-file-manager'

    Vue.use(Vuex);

    const store = new Vuex.Store();

    Vue.use(FileManager, {
        store
    });

    window.fm = new Vue({
        el: '#fm',
        store,
        template: '<file-manager></file-manager>'
    });
    ```

4. Edit the content of `resources/views/welcome.blade.php` replacing 
    ```
    <link rel="stylesheet" href="{{ asset('vendor/file-manager/css/file-manager.css') }}">
    ```
    And
    ```
    <script src="{{ asset('vendor/file-manager/js/file-manager.js') }}"></script>
    ```
    With
    ```
    <script src="{{ asset('js/app.js') }}"></script>
    ```

5. Compile frontend package
    ```
    npm run dev
    ```

6. Work on frontend package at `node_modules/laravel-file-manager` doing the modifications needed. Would be better to track changes using git

7. Compile again by `npm run production` then copy final `public/js/app.js` to your laravel app `public/js/file-manager.js` you don't need any css files as it is already included in the js file
