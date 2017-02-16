window.addEventListener("load", function (){

	function createEventslisteners(){

		// eventlisteners for like, unlike and reply
		// clicking the word "like" calls liketoUnlike function
		// clicking the word "unlike" calls unliketolike function
		// clicking the word "reply" calls openReplies function
		// clicking the word "share" calls sharemodal function
		var likeArray = document.getElementsByClassName("action--like");
		var unlikeArray = document.getElementsByClassName("action--unlike");
		var replyArray = document.getElementsByClassName("action--reply");
		var sharetrigger = document.getElementsByClassName("action--share");
		
		sharetrigger[0].addEventListener("click",shareModal);
		for (i=0; i < likeArray.length; i++) {
			likeArray[i].addEventListener('click',likeUnlike);
			unlikeArray[i].addEventListener('click',likeUnlike);
			if (replyArray[i]){
				replyArray[i].addEventListener("click",openReplies);
			}
		}

		var names = document.getElementsByClassName("name");
		for (i=0;i<names.length;i++){
			names[i].addEventListener("click",nameModal);
		}

		var sharetrigger = document.getElementsByClassName("action--share");
		sharetrigger[0].addEventListener("click",shareModal);

		var commentsubmit = document.getElementsByClassName("action--submitcomment");
		commentsubmit[commentsubmit.length-1].addEventListener("click",makeComment);
		for (i=0; i<commentsubmit.length-1; i++){
			commentsubmit[i].addEventListener("click",makeComment);
		}

		var triggerFocus = document.getElementsByClassName("action--comment")[0];
		triggerFocus.addEventListener("click",makeFocus);

		var exbox = document.getElementsByClassName("modal__close")[0];
		exbox.addEventListener("click",closeModal);

		var background = document.getElementsByClassName("modal")[0];
		background.addEventListener("click",closeModal);

	}
	createEventslisteners();

	function likeUnlike (){
		if (this.textContent == "Like"){ var x=1; var other = this.nextElementSibling;} 
		else {var x=-1; var other = this.previousElementSibling;}

		// show and hide "like" and "unlike" text
		this.style.display = "none";
		other.style.display = "inline-block";

		// change number of likes
		if (this.classList.contains("firstlike")){
			var numLikesString = document.getElementsByClassName("post__info")[0].children[0];
		} else {
			var numLikesString = this.parentElement.getElementsByTagName("span")[0];
		}
		var likesArray = numLikesString.textContent.split(" ");
		likesArray[0] = parseInt(likesArray[0]) + x;
		var newText = likesArray.join(" ");
		numLikesString.textContent = newText;
	}

	function openReplies(){
		replycomments = this.parentElement.parentElement.getElementsByClassName("replies")[0]
		if (replycomments.style.display == "none"){
			replycomments.style.display = "block";
		} else {
			replycomments.style.display = "none"
		}
	}

	function nameModal(){
		document.getElementsByClassName("modal")[0].style.display = "block";
		document.getElementsByClassName("modal__content")[0].style.display = "block";
		nametext = this.innerText;
		document.getElementsByClassName("modal__title")[0].innerText = nametext;
		friends = this.dataset.friends;
		body = nametext + " has " + friends + " friends";
		document.getElementsByClassName("modal__body")[0].innerText = body;
	}

	function shareModal(){
		document.getElementsByClassName("modal")[0].style.display = "block";
		document.getElementsByClassName("modal__content")[0].style.display = "block";
		nametext = this.parentElement.parentElement.children[0].children[1].children[0].innerText;
		title = "Share " + nametext +"'s post";
		document.getElementsByClassName("modal__title")[0].innerText = title;
		body = this.parentElement.parentElement.children[1].children[0].innerText;
		document.getElementsByClassName("modal__body")[0].innerText = body;
	}

	function closeModal(){
		document.getElementsByClassName("modal__content")[0].style.display = "none";
		document.getElementsByClassName("modal")[0].style.display = "none";
	}

	function makeComment(){
		var newtext = this.previousElementSibling.value
		if (newtext == ""){
			alert("You need to enter some text!")
		}
		else{
			var itm = document.getElementsByClassName("post__comments")[0].children[1];
			var cln = itm.cloneNode(true);

			if (this.classList.contains("maincomment")){
				var numComments = this.parentElement.parentElement.parentElement.parentElement.children[0].children[1];
				parentnode = document.getElementsByClassName("post__comments")[0]
				parentnode.appendChild(cln);
				var length = parentnode.children.length;
			}
			else{
				var numComments = this.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[2];
				var parentnode = this.parentElement.parentElement.parentElement.parentElement
				var length = parentnode.children.length
				parentnode.insertBefore(cln,parentnode.children[length-1])				
			}

			// change number of replies
			var numArray = numComments.textContent.split(" ");
			numArray[0] = parseInt(numArray[0]) + 1;
			var newTextnum = numArray.join(" ");
			numComments.textContent = newTextnum;

			// change comment info
			var newcommentinfo = parentnode.children[length-1].children[1];
			newcommentinfo.children[0].textContent = "Leanna";
			newcommentinfo.children[0].dataset.friends = "90";
			newcommentinfo.children[2].children[2].textContent = "Reply";
			newcommentinfo.children[2].children[3].textContent = "0 likes";
			newcommentinfo.children[1].textContent = newtext;

			createEventslisteners();
			event.preventDefault();
			this.previousElementSibling.value = "";
		}
	}
	
	function makeFocus(){
		// debugger;
		// document.getElementsByClassName("commentText")[0].focus();
		this.parentElement.parentElement.parentElement.children[1].children[2].children[1].children[0].children[0].focus();
	}

});