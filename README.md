# Assetic Gulp Booster

Optimize css and javascript to reduce website loading time.

## Short Description

The need for reducing website loading time requires improving the way css and javascript are deployed. 
Part of this is accomplished by minimizing the number of files and the size of these.

**The idea of this project is generate a unique css/js file from a set of files assuming these will be used somewhere in a web page. It assumes that pages are referenced by a section-subsection**

Benefits: 
- No conflicts between sections (less UX bugs). 
- css/js files can be reutilized, though it's recommended only reutilize common assets.
- Better results on Page Speed tests and get some benefits on SEO.
- This strategy works fine from small to big projects.

The project uses sass as scripting language to generate css final files, but can be modified to suite other needs.

**BrowserSync functionallity is implemented and optimized.** 
The Watcher task that considers individual source asset file changes for re-creating final optimized assets, even though files included in scss.
If such files is used in more than one section/subsection, each final optimized assets section/subsection will be re-generated. 



## Getting Started

To generate optimized asset files, a custom asset folder structure is required. Anyone can use their own folder structure by changing some configuration paths.

- A main folder will include configuration files. This configuration files will define what files will conform a final optimized file.

- A main folder with the source css/js files.

Note than this file organization is simple, just section-subsection. 
A Section can be for instance:frontend, backend.
And a Subsection can be for instance: homepage, contact, products.


## File Structure

```
project
│  README.md
│   
├--- config
│    ├── css
│    │    ├── frontend/homepage.js
│    │    └── frontend/contact.js
│    └-- js
│         ├── frontend/homepage.js
│         ├── frontend/contact.js
│         ├── backend/products-edit.js        
│         └── backend/products-list.js
│
├─-- assets
│    ├── css
│    │    ├── common
│    │    │   ├── _vars.scss
│    │    │   └── _mixins.scss
│    │    │   
│    │    ├-- frontend
│    │    │   ├── common
│    │    │   │   ├-- header.scss
│    │    │   │   └-- footer.scss
│    │    │   ├── homepage
│    │    │   │   ├── homepage.sass
│    │    │   │   ├── partners.scss
│    │    │   │   └── slider.scss
│    │    │   └── contact
│    │    │       ├── contact.sass
│    │    │       └── contact.scss
│    │    │       
│    │    └-- backend
│    │    
│    └--  js
│    │    ├── common
│    │    │   ├── console_log.js
│    │    │   └── navigation.js
│    │    ├-- frontend
│    │    │   ├── common
│    │    │   │   ├-- customer_support.js
│    │    │   │   └-- promotions_popup.js
│    │    │   ├── backend
│    │    │   │   ├── products
│    │    │   │   │   ├-- edit.js
│    │    │   │   │   └-- list.js
│    │    │   │   └── users
├─-- web
│    ├── css
│    │    ├── frontend_homepage.js
│    │    └── frontend_contact.js
│    └-- js
│         ├── frontend_homepage.js
│         ├── frontend_contact.js
│         ├── backend_products-edit.js        
│         └── backend_products-list.js
```

## Installation

 - NodeJs is required
 - Run: npm install --save-dev
 

## Running The Assetic engine

 - Cd to **gulp** folder and Run in a terminal window: **gulp**
    - By default gulp runs the default task which creates all assets
    - A single Section/Subsection assets can be created by passing arguments:
         - Section:  **--section -s**
         - SubSection:  **--subsection -u**
         - Type: **--type -t**        
            - For generating only css, pass the argument **--type=css**
            - For generating only js, pass the argument **--type=js**
            - For generatin both, css and js, pass nothing or pass -t=css,js
        
- For watching changes on-the-fly without having to manually reload browser, just pass the arguments:  **--watch -w**
  This will launch a BrowserSync instance that, by default, will listen to the port 3000.

## DEMO

For demo purposes, there is a rude script that runs a server and listens to the port 8080.

For this to work, just run in a terminal window: node server.js  (port 8080 by default)


Type in a browser **http://localhost:8080** for watching the demo. 

Css and Js changes can be made and watched on the fly when running the command (cd to run folder): **gulp -w** and accessing the browser by **http://localhost:3000**


## Contributing

Assetic Gulp Booster is an open source, community-driven project. Pull requests are very welcome.


## Page Speed Test Pages

https://developers.google.com/speed/pagespeed/insights/

https://www.gtmetrix.com/

## License

Assetic Gulp Booster is released under the [MIT License](LICENSE).
