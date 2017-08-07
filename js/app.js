// Main Javascript Application for Twittler
// Kenny Cao

$(document).ready(function() {
  var $body = $('#tweet-streams');

  // var $body = $('body');
  // $body.html('');

  // var index = streams.home.length - 1;

  function populate() {
    var index = streams.home.length - 1;

    while(index >= 0){
      var tweet = streams.home[index];

      var tweetUser = '<div class="tweet-user"><a href="#" class=' + tweet.user + '>@' + tweet.user + '</a></div>';
      var tweetTime = '<div class="tweet-time">' + jQuery.timeago(tweet.created_at) + '</div>';
      var tweetMessage = '<div class="tweet-message">' + tweet.message + '</div>';

      var $tweet = $('<div class="tweet-cell"></div>');
      $tweet.append(tweetUser).append(tweetTime).append(tweetMessage);
      $tweet.appendTo($body);
      index -= 1;
    }
  }

  function populateByUser(username) {
    console.log(username);
    $body.find('div div a').not('.' + username).closest('.tweet-cell').hide();
  }

  populate();

  // New Tweets Click Action - refresh all tweets
  $('.main-tweets').on('click', 'button', function(event) {
    // event.preventDefault();
    $('.tweet-cell').remove();
    populate();
  })

  // User Name Click Action - filter tweets by user
  $('#tweet-streams').on('click', 'a', function(event) {
    // event.preventDefault();
    var user = this.getAttribute('class');
    $userView = $('<p>User Name: ' + user + '</p>' +
                  '<p><a href="#" id="all-tweets">Return to entire tweets</a></p>');
    $('#current-view p').remove();
    $userView.appendTo('#current-view');
    populateByUser(user);
  });

  // Return to entire tweets action
  $('#current-view').on('click', '#all-tweets', function() {
    $('#current-view p').remove();
    $('#current-view').append('<p>All Tweets</p>');
    populate();
  });

});