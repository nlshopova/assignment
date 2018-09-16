var kittens;
var currentKittenIndex = 0;
$(document).ready(function() {
  $.get("http://my-json-server.typicode.com/airtame/kittens/kittens")
    .done(function(data) {
      kittens = data;
      displayKittens(kittens);
      $(".kitten-wrap")
        .first()
        .addClass("current");
    })
    .fail(function() {
      $(".kittens-wrap").html(
        '<div class="kitten">No kittens to show right now</div>'
      );
    });
});
function displayKittens(kittens) {
  for (var i = 0; i < kittens.length; i++) {
    let currentKitten = kittens[i];
    $(".kittens-wrap").append(
      `<div class="kitten-wrap">
        <div class="kitten" data-likesYou="${currentKitten.likesYou}">
          <div class="picture-wrap">
            <img src="${currentKitten.images[0]}" alt="photo of ${
        currentKitten.name
      }" />
          </div>
          <div class="kitten-details">
                <h2>${currentKitten.name}</h2>
                <p>${currentKitten.bio}</p>
            </div>
        </div>
      </div>`
    );
  }
}

function kittenAction(action) {
  if ($(".current").length > 0 && 
    (action == "superlike" || (action == "like" && $(".current .kitten").data("likesyou") == true))) {
      loadOverlay(
        $(".current .kitten-details h2").text(),
        $(".current img").attr("src"),
        action
      );
  } else {
    displayNextKitten(action);
  }
}

function getActionText(action) {
  var actionText = "";
  switch (action) {
    case "dislike":
      actionText = "oops";
      break;
    case "superlike":
      actionText = "super like";
      break;
    case "like":
      actionText = "like";
      break;
  }
  return actionText;
}

function displayNextKitten(action) {
  $(".picture-wrap", ".current").append(
    `<div class="action-text ${action}">${getActionText(action)}</div>`
  );

  $(".current").animate(
    {
      transform : 'translateY(-80px) rotate(40deg)',
      opacity: 0
    },
    {
      duration: 1000,
      complete: function() {
        $(this)
          .removeClass("current")
          .next()
          .addClass("current");
      }
    }
  );
}

function removeOverlay(action) {
  $(".overlay").remove();
  displayNextKitten(action);
}

function loadOverlay(name, picture, action) {
  $(".wrapper").prepend(`
                <div class="overlay">
                  <h2>It's a Match</h2>
                  <div class="kittens-match">
                  <div>
                    <div class="up-wrap">
                      <img src="images/profile-pic.jpg" alt="user profile picture" />
                    </div>
                    You
                    </div>
                    <div> 
                    <div class="up-wrap">
                      <img src="${picture}" alt="user profile picture" />
                    </div>
                  ${name}
                  </div>
                  </div>
                  <button onClick="removeOverlay('${action}')">Continue playing</button>
                </div>`);
}
