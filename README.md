# trout and climate

This website uses visual storytelling to describe how climate vulnerability for redband trout depends on their climate-adaptation.

This repo uses R, Vue, and D3 to build an interactive data visualization website about indicators of vulnerability to water insecurity. In R there is a pipeline that uses the `targets` library to fetch, process, and visualize data. The rest of the files build the website. It is currently in active development.

## To access the data from ScienceBase in R

Activate ScienceBase credentials. Note, you only have to do this once to get the data the first time.

1. Run the code below
2. When prompted, enter your email address as the username
3. Log into https://sciencebase.usgs.gov/manager/ and select "Copy API Token" from the User dropdown menu
4. Copy the Token into the pop up dialog. If this worked, you should get a "TRUE" result in the console.

`sbtools::initialize_sciencebase_session()`

Fetch data from ScienceBase.

> Benjamin, J.R., Dunham, J.B., and Penn, C.A., 2023, Simulated growth potential of redband trout in the Donner und Blitzen River Basin, southeastern Oregon, using a bioenergetics model: U.S. Geological Survey data release, https://doi.org/10.5066/P9MAXBZN.

`sbtools::item_file_download(sb_id = "65381be6d34ee4b6e05bba62", dest_dir = "in/sciencebase/", overwrite_file = FALSE)`

## Running the targets pipeline in R
Clone the repo. In RStudio, run `library(targets)` and `tar_make()`. This will require ScienceBase credentials to run, see instructions below.

## Building the website locally
 Clone the repo. In the directory, run `npm install` to install the required modules. Once the dependencies have been installed, run `npm run dev` to run locally from your browser.
 
 To build the website locally you'll need `npm v20` and `node v8.1` or higher installed. To manage multiple versions of `npm`, you may [try using `nvm`](https://betterprogramming.pub/how-to-change-node-js-version-between-projects-using-nvm-3ad2416bda7e).

## Deploying the website

More here soon
