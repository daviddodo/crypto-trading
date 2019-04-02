<?php

require_once '/Users/jonniequezada/Desktop/trading/backend/models/Model.php';

class User extends Model  //user is sub-class of database
{
	public $email;
	public $password;
	public $two_fa;
	public $role;
	public $status;

	function __construct($email, $password, $two_fa, $role, $status)
	{
        parent::__construct();

        $this->email = $email;
        $this->password = $password;
		$this->two_fa = 0;
		$this->role = 'user';
		$this->status = 'active';
    }
	
	public function addUser()
	{
		$stmt = $this->_connection->prepare("INSERT INTO user (email, password, two_fa, role, status) value (:email, :password, :two_fa, :role, :status");
		$stmt = execute((array)$newUser);
	}

	public function verifyDuplicate($email)
	{
		return (getUser($email) != false);
	}
	
	public function modifyPassword($email, $password)
	{
		$user = getUser($email);
		
		if (password_verify($password, $user->password)
		{
			$stmt = $this->_connection->prepare("UPDATE User SET password = :password WHERE email = :email");
			$stmt->execute([':email'=>$email, ':password'=>$password]);
		}
	}
	
	/*public function modifyTwoFa($email, $two_fa)
	{
		if ($two_fa == 0)
		{
			$two_fa = 1;
		}
		else
		{
			$two_fa = 0;
		}
		
		$stmt = $this->_connection->prepare("UPDATE User SET two_fa =  :status WHERE email = :email");
		$stmt->execute(['status'=>$status, ':email'=>$email]);
	}*/
	
	public function getUser($email)
	{
		$stmt = $this->_connection->prepare("SELECT * FROM User WHERE email = :email");
		$stmt->execute([':email'=>$email]);
		$stmt->setFetchMode(PDO::FETCH_CLASS, "User");
		
		return $stmt->fetch();
	}
}