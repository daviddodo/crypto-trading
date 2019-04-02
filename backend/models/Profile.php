<?php

require_once '/Users/jonniequezada/Desktop/trading/backend/models/Model.php';

class Profile extends Model
{
	public $fname;
	public $lname;
	public $age;
	public $country_id;
	public $currency_code;
	
	function Profile($e, $p, $f, $r, $s)
	{
		$this->fname = $e;
		$this->lname = $p;
		$this->age = $f;
		$this->country_id = $r;
		$this->currency_code = $s;
	}

	$newProfile = new User($data["fname"], $data["lname"], $data["age"], $data["country_id"], $data["currency_code"]);

	$stmt = $DBH->prepare("INSERT INTO profile (fname, lname, age, country_id, currency_code) value (:fname, :lname, :age, :country_id, :currency_code");
	$stmt = execute((array)$newProfile);
}