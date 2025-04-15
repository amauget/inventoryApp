You can find all open source links in links.md

Installs: 
    express
    ejs
    pg
    dotenv
    multer -- for file uploads


The database used for the "Post You Classic!" page was manually created. 
Even with AI assistance, it was an exstensive amount of work. It is far from comprehensive, and has inaccuracies to year/make/model. Nonetheless it is a good proof of concept.


Add A Car Page:
    Project has been designed to allow public car posting of up to 10 images, with basic information about the post.
    These include year, make, model, transmission type, price, description, and of course, images. Category(domestic, jdm, euro) is added at the time of post based on DB definition.

Post security protocol:
    This is my first attempt at sanitizing a post request. There is plenty of room to grow. 
    
    Inputs:
        Inputs, including selectors are ran through an escape function to remove potential scripts.
        Year, make, & model are verified as valid (not altered in the browser)
        An ID is also assigned to the post, and queries are formatted in db.query('request', [args]) format to prevent direct injection.


    Image Files:
        Uploaded images are initially stored in memory via multer. Disk storage seemed insecure as it writes the file to a directory before being properly vetted for security (maybe my concerns are unfounded). 
        
        File length is capped to prevent server overload

        Files are verified as a valid img type.

        File name and path are removed, a random uuid is assigned to the file, and the path is written to the storage directory. 

Image Rendering:
    The image directory was kept out of the public folder for security reasons.

    Images were instead converted to base64 and stored in an array, then passed through EJS as an argument.

The home page:
    The homepage includes all posts (index[0] image and brief details) and two basic filters: category, and make.


The view single page:
    Not much to say. It renders all data for the specific post ID.

Remove Car Page:
    Has basic authentication to only allow me the permission to remove posts.
