# Deck Builder

A MTG Magic the Gathering deck building utility // written in JS with a Rails API backend. 
Currently Full ZNR Setlist is displayed.

API Repo Link: https://github.com/Tinkerjoe-Git/magecraft-backend

note: you can change the seeded data by changing card_data variable set: 'znr' to any set: 'code' you like i.e. 'kld', 'eld', or if you want to download the entire 20,000+ card catalog from the MTG API change card_data = MTG::Card.all ( This will take 10+ minutes to create all the card objects ).

card_data = MTG::Card.where(set: 'znr').all      


### Prerequisites

An IDE:

     VSCode, or Atom, Sublime, etc.

### Installing

1. Fork and Clone the repository.

2. Load up the API magecraft-backend in your IDE

3. Run 'bundle install' in your terminal to get dependencies

4. Run 'rails s' in your terminal to create our local environment,
 
5. Use cntl(or 'cmd') + left click on the local host link that Rails / Puma output, this will take us into the API

6. Use npm install to get your packages, then npm start and you'll be off to the races.

## Built With

  - React
  - Rails
  - ActiveRecord
  - SQLite3
  - and all the lovely gems in the Gemfile, not to mention all the packages in our json file. 

## Author

  - **Nicholas Stagno** - 
    

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

  - Flatiron School
  - HUGE HUGE shoutout to this CSS guide: https://github.com/adamschwartz/magic-of-css/tree/gh-pages/css
  - My homies in the flatiron cohort.
 
 ##Caveats
 
 I am in no way affiliated with Magic the Gathering IP's or License with Wizards of the Coast.
