//use watson library
const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');


// The text that we want to analyze the tone of.
let text = `
Oh, flew in from Miami Beach B.O.A.C.
Didn't get to bed last night
On the way the paper bag was on my knee
Man I had a dreadful flight
I'm back in the U.S.S.R.
You don't know how lucky you are boy
Back in the U.S.S.R. (Yeah)
Been away so long I hardly knew the place
Gee it's good to be back home
Leave it till tomorrow to unpack my case
Honey disconnect the phone
I'm back in the U.S.S.R.
You don't know how lucky you are boy
Back in the U.S.
Back in the U.S.
Back in the U.S.S.R.
Well the Ukraine girls really knock me out
They leave the West behind
And Moscow girls make me sing and shout
That Georgia's always on my mind
Aw come on!
Yeah I'm back in the U.S.S.R.
You don't know how lucky you are boys
Back in the U.S.S.R.
Well the Ukraine girls really knock me out
They leave the West behind
And Moscow girls make me sing and shout
That Georgia's always on my mind
Oh, show me around your snow-peaked mountains way down south
Take me to your daddy's farm
Let me hear your balalaika's ringing out
Come and keep your comrade warm
I'm back in the U.S.S.R.
Hey you don't know how lucky you are boys
Back in the U.S.S.R.
Oh let me tell you, honey
Hey, I'm back!
I'm back in the U.S.S.R.
Yes, I'm free!
Yeah, back in the U.S.S.R.
Ha ha
When I get to the bottom I go back to the top of the slide
Where I stop and I turn and I go for a ride
Till I get to the bottom and I see you again
Do, don't you want me to love you
I'm coming down fast but I'm miles above you
Tell me, tell me, tell me, come on tell me the answer
Well, you may be a lover but you ain't no dancer
Helter skelter, helter skelter
Helter skelter
Will you, won't you want me to make you
I'm coming down fast but don't let me break you
Tell me, tell me, tell me the answer
You may be a lover but you ain't no dancer
Look out
Helter skelter, helter skelter
Helter skelter
Look out, 'cause here she comes
When I get to the bottom I go back to the top of the slide
And I stop and I turn and I go for a ride
And I get to the bottom and I see you again, yeah, yeah
Well do you, don't you want me to make you
I'm coming down fast but don't let me break you
Tell me, tell me, tell me your answer
You may be a lover but you ain't no dancer
Look out
Helter skelter, helter skelter
Helter skelter
Look out, helter skelter
She's coming down fast
Yes, she is
Yes, she is
Coming down fast
Desmond has a barrow in the marketplace
Molly is the singer in a band
Desmond says to Molly, girl, I like your face
And Molly says this as she takes him by the hand
Ob la di, ob-la-da, life goes on, bra
La-la, how the life goes on
Ob-la di, ob-la-da, life goes on, bra
La-la, how the life goes on
Desmond takes a trolley to the jeweller's store
Buys a twenty carat golden ring
Takes it back to Molly waiting at the door
And as he gives it to her she begins to sing
Ob la di, ob-la-da, life goes on, bra
La-la, how the life goes on
Ob-la di, ob-la-da, life goes on, bra
La-la, how the life goes on
In a couple of years they have built
A home sweet home
With a couple of kids running in the yard
Of Desmond and Molly Jones
Happy ever after in the market place
Desmond lets the children lend a hand
Molly stays at home and does her pretty face
And in the evening she still sings it with the band
Ob la di, ob-la-da, life goes on, bra
La-la, how the life goes on
Ob-la di, ob-la-da, life goes on, bra
La-la, how the life goes on
In a couple of years they have built
A home sweet home
With a couple of kids running in the yard
Of Desmond and Molly Jones
Happy ever after in the market place
Molly lets the children lend a hand
Desmond stays at home and does his pretty face
And in the evening she's a singer with the band
Ob la di, ob-la-da, life goes on, bra
La-la, how the life goes on
Ob-la di, ob-la-da, life goes on, bra
La-la, how the life goes on
And if you want some fun, sing ob-la-di, bla-da
`
//Initialize by giving our credentials
const personalityInsights = new PersonalityInsightsV3({
  version: '2017-10-13',
  iam_apikey: 'glikG1rje_eWT-Bhs7CFTlWbp1Lg-W1vY3nlxp49d933',
});



const profileParams = {
  // Get the content from the JSON file.
  content: text,
  content_type: 'text/plain',
  consumption_preferences: true,
  raw_scores: true,
};

personalityInsights.profile(profileParams)
  .then(profile => {
    console.log(JSON.stringify(profile, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });
