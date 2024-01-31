# trout_and_climate

This website uses visual storytelling to describe how climate vulnerability for redband trout depends on their climate-adaptation.

## To create the data visualizations

Activate ScienceBase credentials. Note, you only have to do this once to get the data the first time.

1. Run the code below
2. When prompted, enter your email address as the username
3. Log into https://sciencebase.usgs.gov/manager/ and select "Copy API Token" from the User dropdown menu
4. Copy the Token into the pop up dialog. If this worked, you should get a "TRUE" result in the console.

`sbtools::initialize_sciencebase_session()`


Fetch data from ScienceBase.

> Benjamin, J.R., Dunham, J.B., and Penn, C.A., 2023, Simulated growth potential of redband trout in the Donner und Blitzen River Basin, southeastern Oregon, using a bioenergetics model: U.S. Geological Survey data release, https://doi.org/10.5066/P9MAXBZN.

`sbtools::item_file_download(sb_id = "65381be6d34ee4b6e05bba62", dest_dir = "in/sciencebase/", overwrite_file = FALSE)`



