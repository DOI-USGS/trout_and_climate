# Climate resiliency through the eyes of Redband Trout

This website uses visual storytelling to describe how climate vulnerability for Redband Trout depends on their climate-adaptation.

This repo uses R and Vue.js to build a data visualization website about indicators of vulnerability to water insecurity. In R, there are scripts showing how to fetch, process, and visualize data. The rest of the files build the website. 

## To access the data from ScienceBase in R

Activate ScienceBase credentials. Note, you only have to do this once to get the data from each release for the first time. 

1. Install the latest version of the `sbtools` package. (Requires `sbtools` v1.3.0 or newer)
2. Run the code below
3. When prompted, enter your email address as the username
4. Log into https://sciencebase.usgs.gov/manager/ and select "Copy API Token" from the User dropdown menu
5. Copy the Token into the pop up dialog. If this worked, you should get a "TRUE" result in the console.

`sbtools::initialize_sciencebase_session()`

Fetch data from ScienceBase. The full code to download data for this site is listed in `R_src/01_fetch_data.qmd`. For example, to fetch data from this data release, use the following code:

> Benjamin, J.R., Dunham, J.B., and Penn, C.A., 2023, Simulated growth potential of redband trout in the Donner und Blitzen River Basin, southeastern Oregon, using a bioenergetics model: U.S. Geological Survey data release, https://doi.org/10.5066/P9MAXBZN.

```{r, eval="FALSE"}
sbtools::item_file_download(sb_id = "65381be6d34ee4b6e05bba62", 
    dest_dir = "R_src/in/sciencebase/", 
    overwrite_file = FALSE)
```

Other data releases included to produce the figures are: 

> Sando, R.R., and Schultz, A.R., 2022, Reach-scale predicted annual streamflow permanence probabilities, predicted monthly mean stream temperature for August, and predicted monthly streamflow discharge for stream reaches in the Pacific Northwest, USA (2004-2015) (ver. 2.0, January 2023): U.S. Geological Survey data release, https://doi.org/10.5066/P94SMJKI.

> Miller, M.P., Carlisle, D.M., Wolock, D.M., and Wieczorek, M.E., 2018, Natural Monthly Flow Estimates for the Conterminous United States, 1950-2015: U.S. Geological Survey data release, https://doi.org/10.5066/F7CC0ZMG.

> Laramie, M.B., Mejia, F.H., Heaston, E.D., and Dunham J.B., 2020, Fishes of the Harney Basin revisited: A contemporary assessment of the distribution of fish fauna throughout the Harney Basin from 1990 to 2019 (ver. 2.0, April 2022): U.S. Geological Survey data release, https://doi.org/10.5066/P9QZGDMB.

> Penn, C.A., Dunham, J.B., Markstrom, S.L., Overstreet, B.T., and Stratton, L.E., 2023, Simulated streamflow and stream temperature in the Donner und Blitzen River Basin, southeastern Oregon, using the Precipitation-Runoff Modeling System (PRMS): U.S. Geological Survey data release, https://doi.org/10.5066/P9WQM25Y.

## To recreate the figures

The code to process the data and create the data visualizations are included as R-Markdown scripts in the `R_src/` directory. Corresponding data should be stored in the `R_src/in/sciencebase/` directory. (Exact pathways to each file are listed in the R-markdown scripts.)

## Building the website locally
 Clone the repo. In the directory, run `npm install` to install the required modules. Once the dependencies have been installed, run `npm run dev` to run locally from your browser.
 
 To build the website locally you'll need `npm v20` and `node v8.1` or higher installed. To manage multiple versions of `npm`, you may [try using `nvm`](https://betterprogramming.pub/how-to-change-node-js-version-between-projects-using-nvm-3ad2416bda7e).

